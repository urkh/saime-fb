'use strict';


var ctrl = angular.module('app.controllers_ven', []);


ctrl.controller('FormRegistroMenorCCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $timeout, $scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {
    
    /*
    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }
    */

    $scope.letras = [
        { id: 'V', letra: 'V'},
        { id: 'E', letra: 'E'}
    ];

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formSearch = {};
    $scope.formNoData = {};


    $scope.codigos = CodigoTelfFactory;

    $scope.buscar_menor_cedulado = function() {

        if($scope.formSearch.cedula){

            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrame, cedula: $scope.formSearch.cedula}).success(function(response) {
                if(response.errorCode === '00000'){
                    $http.post("api/api.php?opc=validar_cita_menor&bcode="+$rootScope.bcode, {idpersona:response.cedulado.idpersona, minorType:$scope.formData.minorType}).success(function(res) { 

                        if(res.errorCode === '00000'){
                            $scope.formData.minorId = response.cedulado.idpersona; 
                            $scope.formSearch.cedula = response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                            $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 

                            $scope.formData.name1 = response.cedulado.primernombre;
                            $scope.formData.name2 = response.cedulado.segundonombre;
                            $scope.formData.lastName1 = response.cedulado.primerapellido;
                            $scope.formData.lastName2 = response.cedulado.segundoapellido;
                            $scope.formData.bDate = response.cedulado.fechanacimiento;
                            response.cedulado.sexo == 'F' ? $scope.formData.gender = 'Femenino' : $scope.formData.gender = 'Masculino';
                            
                            $timeout(function(){
                                $scope.error = false;
                                $scope.continuar1();
                            }, 1500);

                        }else{
                            $scope.error_msg = res.consumerMessage;
                        }

                    }).error(function(){
                        $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                    });

                }else{
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });
        
        }else{
            $scope.showErrorsCheckValidity = true;
        }
    }



    $scope.buscar_madre = function() {

        if($scope.formSearch.cedulam, $scope.formSearch.letram){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'F'){
                        $scope.formData.motherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $scope.error_msg = "No se encontraron resultados";
                    }

                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });
        }
    }

    $scope.buscar_padre = function(){
        
        if($scope.formSearch.cedulap, $scope.formSearch.letrap){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;


            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'M'){
                        $scope.formData.fatherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $scope.error_msg = "No se encontraron resultados";
                    }
                    
                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }


    }

    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){
                    $scope.formData.legalId = response.cedulado.idpersona; 
                    $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    
                    $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                  
                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }
    }


    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response){ 
        $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response){ 
        $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
        $scope.municipios = MunicipiosFactory($scope.formData.state);
    }

    $scope.get_parroquias = function(){
        $scope.parroquias = ParroquiasFactory($scope.formData.town);
    }

    $scope.get_cmunicipios = function(){
        $scope.cmunicipios = MunicipiosFactory($scope.formData.currentState);
    }

    $scope.get_cparroquias = function(){
        $scope.cparroquias = ParroquiasFactory($scope.formData.currentTown);
    }

    $scope.get_oficinas = function(){
        $scope.oficinas = OficinasFactory($scope.formData.currentState);
    }

    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){

        if($scope.formData.minorType==='3'){
            if((form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $scope.step3 = "display:none;";
                $scope.step4 = "display:block;";
            }else{
                $scope.showErrorsCheckValidity = true;
            }
        }else{
            if((form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $scope.step3 = "display:none;";
                $scope.step4 = "display:block;";
            }else{
                $scope.showErrorsCheckValidity = true;
            }
        }

    }

    $scope.continuar3 = function(form){
        $scope.formData.cellPhone = $scope.formNoData.phone_code_cell + $scope.formNoData.cellPhone;
        $scope.formData.homePhone = $scope.formNoData.phone_code_home + $scope.formNoData.homePhone;
        $scope.formData.workPhone = $scope.formNoData.phone_code_work + $scope.formNoData.workPhone;

        if((form.currentState && form.currentTown && form.currentParish && form.currentCity && form.urbanization && form.noApto && form.street && form.pCode) && ($scope.formData.cellPhone || $scope.formData.workPhone || $scope.formData.homePhone)) {                
            $scope.step4 = "display:none;";
            $scope.step5 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }



    $scope.guardar = function(form){

        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;
        
        if($scope.formData.offices != ""){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            if($scope.formData.gender == 'Femenino'){$scope.formData.gender = 'F';}else{$scope.formData.gender = 'M';}
            if($scope.formData.workPhone == null){$scope.formData.workPhone = "";}
            if($scope.formData.homePhone == null){$scope.formData.homePhone = "";}
            if($scope.formData.cellPhone == null){$scope.formData.cellPhone = "";}

            $scope.alldata = {
                
                minorType: $scope.formData.minorType,
                minorId: $scope.formData.minorId,
                motherId: $scope.formData.motherId,
                fatherId: $scope.formData.fatherId,
                legalId: $scope.formData.legalId,
                name1: $scope.formData.name1,
                name2: $scope.formData.name2,
                lastName1: $scope.formData.lastName1,
                lastName2: $scope.formData.lastName2,
                gender: $scope.formData.gender,
                bDate: $scope.formData.bDate,
                country: $scope.formData.country,
                countryIni: $scope.formData.countryIni,
                parish: $scope.formData.parish,
                state: $scope.formData.state,
                town: $scope.formData.town,
                city: $scope.formData.city,
                currentState: $scope.formData.currentState,
                currentParish: $scope.formData.currentParish,
                currentTown: $scope.formData.currentTown,
                currentCity: $scope.formData.currentCity,
                urbanization: $scope.formData.urbanization,
                noApto: $scope.formData.noApto,
                pCode: $scope.formData.pCode,
                street: $scope.formData.street,
                homePhone: $scope.formData.homePhone,
                workPhone: $scope.formData.workPhone,
                cellPhone: $scope.formData.cellPhone,
                offices: $scope.formData.offices,
                
            }

            $http.post("api/api.php?opc=sol_ven_menor&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ven");
                }else{
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });

        }
    }


    $scope.atras_e = function(){
        $scope.error = false;
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


}]);





ctrl.controller('FormRegistroMenorNcCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $timeout, $scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {
    
    /*
    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }*/

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

        if($scope.formSearch.cedulam, $scope.formSearch.letram){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'F'){
                        $scope.formData.motherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $scope.error_msg = "No se encontraron resultados";
                    }

                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });
        }
    }

    $scope.buscar_padre = function(){
        
        if($scope.formSearch.cedulap, $scope.formSearch.letrap){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;


            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'M'){
                        $scope.formData.fatherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $scope.error_msg = "No se encontraron resultados";
                    }
                    
                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }


    }

    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){
                    $scope.formData.legalId = response.cedulado.idpersona; 
                    $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    
                    $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                  
                }else{
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }
    }



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
        $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response) { 
        $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
        $scope.municipios = MunicipiosFactory($scope.formData.state);
    }

    $scope.get_parroquias = function(){
        $scope.parroquias = ParroquiasFactory($scope.formData.town);
    }

    $scope.get_cmunicipios = function(){
        $scope.cmunicipios = MunicipiosFactory($scope.formData.currentState);
    }

    $scope.get_cparroquias = function(){
        $scope.cparroquias = ParroquiasFactory($scope.formData.currentTown);
    }

    $scope.get_oficinas = function(){
        $scope.oficinas = OficinasFactory($scope.formData.currentState);
    }




    $scope.continuar1 = function(form){



      if(form.minorType=='4'){

          if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
              $scope.step1 = "display:none;";
              $scope.step2 = "display:block;";
          }else{
              $scope.showErrorsCheckValidity = true;
          }
      }else{
          if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
              $scope.step1 = "display:none;";
              $scope.step2 = "display:block;";
          }else{
              $scope.showErrorsCheckValidity = true;
          }

      }

    }
    

    $scope.continuar2 = function(form){
        $scope.formData.cellPhone = $scope.formNoData.phone_code_cell + $scope.formNoData.cellPhone;
        $scope.formData.homePhone = $scope.formNoData.phone_code_home + $scope.formNoData.homePhone;
        $scope.formData.workPhone = $scope.formNoData.phone_code_work + $scope.formNoData.workPhone;

        if((form.currentState && form.currentTown && form.currentParish && form.currentCity && form.urbanization && form.noApto && form.street && form.pCode) && ($scope.formData.cellPhone || $scope.formData.workPhone || $scope.formData.homePhone)) {              
            $scope.step2 = "display:none;";
            $scope.step3 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }


    $scope.guardar = function(form){
        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;
        $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");
      
        if($scope.formData.offices != ""){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;


            $scope.alldata = {
                
                minorType: $scope.formData.minorType,
                minorId: $scope.formData.minorId,
                motherId: $scope.formData.motherId,
                fatherId: $scope.formData.fatherId,
                legalId: $scope.formData.legalId,
                name1: $scope.formData.name1,
                name2: $scope.formData.name2,
                lastName1: $scope.formData.lastName1,
                lastName2: $scope.formData.lastName2,
                gender: $scope.formData.gender,
                bDate: $scope.formData.bDate,
                country: $scope.formData.country,
                countryIni: $scope.formData.countryIni,
                parish: $scope.formData.parish,
                state: $scope.formData.state,
                town: $scope.formData.town,
                city: $scope.formData.city,
                currentState: $scope.formData.currentState,
                currentParish: $scope.formData.currentParish,
                currentTown: $scope.formData.currentTown,
                currentCity: $scope.formData.currentCity,
                urbanization: $scope.formData.urbanization,
                noApto: $scope.formData.noApto,
                pCode: $scope.formData.pCode,
                street: $scope.formData.street,
                homePhone: $scope.formData.homePhone,
                workPhone: $scope.formData.workPhone,
                cellPhone: $scope.formData.cellPhone,
                offices: $scope.formData.offices,
                
            }


            $http.post("api/api.php?opc=sol_ven_menor&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ven");
                }else{
                    //$state.go("saime.solicitud_pasaporte_error_ven");
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            })

        }
    }

    $scope.atras_e = function(){
        $scope.error = false;
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
      console.log($event)
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = false;
        $scope.opened = true;
    };


    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    };

    $scope.format = 'dd/MM/yyyy';

}]);



ctrl.controller('FormRegistroDatosPersonalesVenCtrl', ['$rootScope', '$state', '$scope', '$http', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', '$timeout', function($rootScope, $state, $scope, $http, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory, $timeout) {

    
    /*
    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }
    */

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formNoData = {};


    $scope.formNoData.name1 = $rootScope.pnombre;
    $scope.formNoData.name2 = $rootScope.snombre;
    $scope.formNoData.lastName1 = $rootScope.papellido;
    $scope.formNoData.lastName2 = $rootScope.sapellido;
    $scope.formNoData.bDate = $rootScope.fechan;
    if($rootScope.sexo == 'F'){$scope.formNoData.gender = 'Femenino';}else{$scope.formNoData.gender = 'Masculino';}


    $scope.codigos = CodigoTelfFactory;

    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
        $scope.paises = response.countryList
    })


    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response) { 
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
        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;
        //$scope.formData.bDate = moment($scope.formData.bDate).format("dd/mm/yyyy");  //moment(testDate).format('MM/DD/YYYY');


        $scope.alldata = {
            cellPhone: $scope.formData.cellPhone,
            city: $scope.formData.city,
            country: $scope.formData.country,
            countryIni: $scope.formData.countryIni,
            currentCity: $scope.formData.currentCity,
            currentParish: $scope.formData.currentParish,
            currentState: $scope.formData.currentState,
            currentTown: $scope.formData.currentTown,
            homePhone: $scope.formData.homePhone,
            noApto: $scope.formData.noApto,
            offices: $scope.formData.offices,
            pCode: $scope.formData.pCode,
            parish: $scope.formData.parish,
            state: $scope.formData.state,
            street: $scope.formData.street,
            town: $scope.formData.town,
            urbanization: $scope.formData.urbanization,
            workPhone: $scope.formData.workPhone
        }
      
      
        if($scope.formData.offices != ""){
            $scope.error = true;
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';

            $http.post("api/api.php?opc=reg_persona&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ven");
                }else{
                    $scope.error_msg = response.consumerMessage;                    
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });

        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }
    
    
    $scope.continuar1 = function(form){
        if(form.countryIni && form.state && form.parish && form.town && form.city) {
            $scope.step1 = "display:none;";
            $scope.step2 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }


    $scope.continuar2 = function(form){
        $scope.formData.cellPhone = $scope.formNoData.phone_code_cell + $scope.formNoData.cellPhone;
        $scope.formData.homePhone = $scope.formNoData.phone_code_home + $scope.formNoData.homePhone;
        $scope.formData.workPhone = $scope.formNoData.phone_code_work + $scope.formNoData.workPhone;

        if((form.currentState && form.currentTown && form.currentParish && form.currentCity && form.noApto && form.urbanization && form.street && form.pCode) && ($scope.formData.cellPhone || $scope.formData.workPhone || $scope.formData.homePhone)) {
            $scope.step2 = "display:none;";
            $scope.step3 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
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

    $scope.atras3 = function(){
        $scope.error = false;
    }



}]);
