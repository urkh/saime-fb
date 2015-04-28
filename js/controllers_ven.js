'use strict';


var ctrl = angular.module('app.controllers_ven', []);


ctrl.controller('FormRegistroMenorCCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', '$localStorage', '$window', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', 'CodigoCelFactory', function($rootScope, $timeout, $scope, $http, $state, $localStorage, $window, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory, CodigoCelFactory) {
    
    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }

    $scope.letras = [
        { id: 'V', letra: 'V'},
        { id: 'E', letra: 'E'}
    ];

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formSearch = {};
    $scope.formNoData = {};


    $scope.codigos = CodigoTelfFactory;
    $scope.codigosc = CodigoCelFactory;

    $scope.buscar_menor_cedulado = function() {

        if($scope.formSearch.cedula){
            $window.scrollTo(0, 0);

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
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'F'){
                        $window.scrollTo(0, 0);
                        $scope.formData.motherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido;                         
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else if(response.cedulado.sexo === 'M'){
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "Est&aacute; colocando la c&eacute;dula de un ciudadano masculino.";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "No se encontraron resultados";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);
                    }

                }else{
                    $scope.error_msg = response.consumerMessage;
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });
        }
    }

    $scope.buscar_padre = function(){
        
        if($scope.formSearch.cedulap, $scope.formSearch.letrap){
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'M'){
                        $window.scrollTo(0, 0);
                        $scope.formData.fatherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else if(response.cedulado.sexo === 'F'){
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "Est&aacute; colocando la c&eacute;dula de un ciudadano femenino.";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "No se encontraron resultados";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);
                    }
                    
                }else{
                    $window.scrollTo(0, 0);
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }


    }

    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){
                    $window.scrollTo(0, 0);
                    $scope.formData.legalId = response.cedulado.idpersona; 
                    $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                  
                }else{
                    $window.scrollTo(0, 0);
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }
    }


    $scope.paises = $localStorage.paises.countryList;
    $scope.estados = $localStorage.estados.stateList;


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
        $http.post("api/api.php?opc=get_oficina_quota&bcode="+$rootScope.bcode, {identidadfederal:$scope.formData.currentState}).success(function(response) { 
            $scope.oficinas = response.pronosticosestadoList;
        });
    }

    $scope.continuar1 = function(){
        $window.scrollTo(0, 0);
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){

        if($scope.formData.minorType==='3'){
            if((form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $window.scrollTo(0, 0);
                $scope.step3 = "display:none;";
                $scope.step4 = "display:block;";
            }else{
                $scope.showErrorsCheckValidity = true;
            }
        }else{
            if((form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $window.scrollTo(0, 0);
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
            $window.scrollTo(0, 0);
            $scope.step4 = "display:none;";
            $scope.step5 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }



    $scope.guardar = function(form){

        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;


        if(!$scope.formData.minorId){$scope.formData.minorId = null;}
        if(!$scope.formData.fatherId){$scope.formData.fatherId = null;}
        if(!$scope.formData.motherId){$scope.formData.motherId = null;}
        if(!$scope.formData.legalId){$scope.formData.legalId = null;}
        if(!$scope.formData.name2){$scope.formData.name2 = null;}
        if(!$scope.formData.lastName2){$scope.formData.lastName2 = null;}
        if(!$scope.formData.bDate){$scope.formData.bDate = null;}

        
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


    $scope.limpiarl = function(){
        $scope.formData.legalId=null;
        $scope.formSearch.cedulal=null;
    }

    $scope.limpiarp = function(){
        $scope.formData.fatherId=null;
        $scope.formSearch.cedulap=null;
    }

    $scope.limpiarm = function(){
        $scope.formData.motherId=null;
        $scope.formSearch.cedulam=null;
    }


}]);





ctrl.controller('FormRegistroMenorNcCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', '$localStorage', '$window', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', 'CodigoCelFactory', function($rootScope, $timeout, $scope, $http, $state, $localStorage, $window, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory, CodigoCelFactory) {
    
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
    $scope.codigosc = CodigoCelFactory;


    $scope.buscar_menor_cedulado = function() {

        if($scope.formSearch.cedula){
            $window.scrollTo(0, 0);

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
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'F'){
                        $window.scrollTo(0, 0);
                        $scope.formData.motherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido;                         
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else if(response.cedulado.sexo === 'M'){
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "Est&aacute; colocando la c&eacute;dula de un ciudadano masculino.";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "No se encontraron resultados";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);
                    }

                }else{
                    $scope.error_msg = response.consumerMessage;
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });
        }
    }

    $scope.buscar_padre = function(){
        
        if($scope.formSearch.cedulap, $scope.formSearch.letrap){
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                if(response.errorCode === '00000'){
                    if(response.cedulado.sexo === 'M'){
                        $window.scrollTo(0, 0);
                        $scope.formData.fatherId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else if(response.cedulado.sexo === 'F'){
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "Est&aacute; colocando la c&eacute;dula de un ciudadano femenino.";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);

                    }else{
                        $window.scrollTo(0, 0);
                        $scope.error_msg = "No se encontraron resultados";
                        $timeout(function(){
                            $scope.error = false;
                        }, 1500);
                    }
                    
                }else{
                    $window.scrollTo(0, 0);
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }


    }

    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $window.scrollTo(0, 0);
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){
                    $window.scrollTo(0, 0);
                    $scope.formData.legalId = response.cedulado.idpersona; 
                    $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $scope.error_msg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                  
                }else{
                    $window.scrollTo(0, 0);
                    $timeout(function(){
                        $scope.error = false;
                    }, 1500);
                    $scope.error_msg = response.consumerMessage;
                }     
              
            }).error(function(){
                $scope.error_msg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
            });

        }
    }


    $scope.paises = $localStorage.paises.countryList;
    $scope.estados = $localStorage.estados.stateList;


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
        $http.post("api/api.php?opc=get_oficina_quota&bcode="+$rootScope.bcode, {identidadfederal:$scope.formData.currentState}).success(function(response) { 
            $scope.oficinas = response.pronosticosestadoList;
        });
    }




    $scope.continuar1 = function(form){


      if(form.minorType=='4'){

          if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $window.scrollTo(0, 0);
                $scope.step1 = "display:none;";
                $scope.step2 = "display:block;";
          }else{
                $scope.showErrorsCheckValidity = true;
          }
      }else{
          if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
                $window.scrollTo(0, 0);
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
            $window.scrollTo(0, 0);
            $scope.step2 = "display:none;";
            $scope.step3 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }


    $scope.guardar = function(form){
        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;
        
        $scope.formData.nobDate = $scope.formData.bDate.format("dd/mm/yyyy");

        if(!$scope.formData.minorId){$scope.formData.minorId = null;}
        if(!$scope.formData.fatherId){$scope.formData.fatherId = null;}
        if(!$scope.formData.motherId){$scope.formData.motherId = null;}
        if(!$scope.formData.legalId){$scope.formData.legalId = null;}
        if(!$scope.formData.name2){$scope.formData.name2 = null;}
        if(!$scope.formData.lastName2){$scope.formData.lastName2 = null;}
      
        if($scope.formData.offices != ""){
            $window.scrollTo(0, 0);
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
                bDate: $scope.formData.nobDate,
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

    $scope.limpiarl = function(){
      $scope.formData.legalId=null;
      $scope.formSearch.cedulal=null;
    }

    $scope.limpiarp = function(){
      $scope.formData.fatherId=null;
      $scope.formSearch.cedulap=null;
    }

    $scope.limpiarm = function(){
      $scope.formData.motherId=null;
      $scope.formSearch.cedulam=null;
    }


    $scope.maxDate = new Date();
    $scope.today = new Date();
    $scope.today.setFullYear($scope.today.getFullYear()-9)
    $scope.minDate = new Date($scope.today)


    $scope.date_open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.formData.dopened = true;
    };


}]);



ctrl.controller('FormRegistroDatosPersonalesVenCtrl', ['$rootScope', '$state', '$scope', '$http', '$timeout', '$localStorage', '$window', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', 'CodigoCelFactory', function($rootScope, $state, $scope, $http, $timeout, $localStorage, $window, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory, CodigoCelFactory) {

    
    
    if(!$rootScope.authenticated){
        $state.go('saime.autenticacion');
    }
    

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
    $scope.codigosc = CodigoCelFactory;

    $scope.paises = $localStorage.paises.countryList;
    $scope.estados = $localStorage.estados.stateList;



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
        $http.post("api/api.php?opc=get_oficina_quota&bcode="+$rootScope.bcode, {identidadfederal:$scope.formData.currentState}).success(function(response) { 
            $scope.oficinas = response.pronosticosestadoList;
        });
    }


    $scope.guardar = function(form){
        $scope.formData.offices = $scope.formData.offices.toString() || "";
        $scope.formData.country = $scope.formData.countryIni;

        $scope.alldata = {

            countryIni: $scope.formData.countryIni,
            country: $scope.formData.country,
            city: $scope.formData.city,
            state: $scope.formData.state,
            town: $scope.formData.town,
            parish: $scope.formData.parish,
            currentState: $scope.formData.currentState,
            currentTown: $scope.formData.currentTown,
            currentParish: $scope.formData.currentParish,
            currentCity: $scope.formData.currentCity,
            urbanization: $scope.formData.urbanization,
            noApto: $scope.formData.noApto,
            street: $scope.formData.street,
            pCode: $scope.formData.pCode,
            cellPhone: $scope.formData.cellPhone,
            homePhone: $scope.formData.homePhone,
            workPhone: $scope.formData.workPhone,
            offices: $scope.formData.offices
            
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
            $window.scrollTo(0, 0);
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
            $window.scrollTo(0, 0);
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
