'use strict';



var ctrl = angular.module('app.controllers_ext', []);



ctrl.controller('FormRegistroMenorCExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', '$localStorage', '$window', 'ConsuladosFactory', 'MunicipiosFactory', 'ParroquiasFactory', function($rootScope, $state, $timeout, $scope, $http, $localStorage, $window, ConsuladosFactory, MunicipiosFactory, ParroquiasFactory) {

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


    $scope.buscar_menor_cedulado = function() {

        if($scope.formSearch.cedula){
            $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.showModal = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrame, cedula: $scope.formSearch.cedula}).success(function(response) {
                if(response.errorCode === '00000'){
                    $http.post("api/api.php?opc=validar_cita_menor&bcode="+$rootScope.bcode, {idpersona:response.cedulado.idpersona, minorType:$scope.formData.minorType}).success(function(res) { 

                        if(res.errorCode === '00000'){
                            $scope.formData.minorId = response.cedulado.idpersona; 
                            $scope.formSearch.cedula = response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                            $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 

                            $scope.formData.name1 = response.cedulado.primernombre;
                            $scope.formData.name2 = response.cedulado.segundonombre;
                            $scope.formData.lastName1 = response.cedulado.primerapellido;
                            $scope.formData.lastName2 = response.cedulado.segundoapellido;
                            $scope.formData.bDate = response.cedulado.fechanacimiento;
                            response.cedulado.sexo == 'F' ? $scope.formData.gender = 'Femenino' : $scope.formData.gender = 'Masculino';
                            
                            $timeout(function(){
                                $scope.showModal = false;
                                $scope.continuar1();
                            }, 3000);

                        }else{
                            //$scope.searchmsg = res.consumerMessage;
                            $scope.searchmsg = "Por favor, verifique que el número de cédula que ha introducido al sistema es correcto. No existe ningún menor venezolano por nacimiento o naturalizado con el número de cédula insertado";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);
                        }

                    }).error(function(){
                        $scope.searchmsg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                    });

                }else{
                    $scope.searchmsg = response.consumerMessage;
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                }
            }).error(function(){
                $scope.searchmsg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
                $timeout(function(){
                    $scope.showModal = false;
                }, 3000);
            });
        
        }else{
            $scope.$broadcast('show-errors-check-validity');
        }
    }


    $scope.buscar_madre = function() {


        if(($scope.formSearch.letram == "E") && ($scope.formSearch.letrap == "E")){
            $scope.searchmsg = 'Al menos uno de los padres debe ser Venezolano'; 
            $scope.showModal = true;

            $timeout(function(){
                $scope.showModal = false;
            }, 3000);

        }else{

            if($scope.formSearch.cedulam, $scope.formSearch.letram){

                $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
                $scope.showModal = true;

                $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                    if(response.errorCode === '00000'){
                        if(response.cedulado.sexo === 'F'){

                            if(response.cedulado.edad >= 18){

                                $scope.formData.motherId = response.cedulado.idpersona; 
                                $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido;                         
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);


                            }else{

                                $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);

                            }

                        }else if(response.cedulado.sexo === 'M'){
                            $scope.searchmsg = "Est&aacute; colocando la c&eacute;dula de un ciudadano masculino.";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);

                        }else{
                            $scope.searchmsg = "No se encontraron resultados";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);
                        }

                    }else{
                        $scope.searchmsg = response.consumerMessage;
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                    }     
                  
                }).error(function(){
                    $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                });
            }
        }
    }
    

    $scope.buscar_padre = function(){


        if(($scope.formSearch.letram == "E") && ($scope.formSearch.letrap == "E")){
            $scope.searchmsg = 'Al menos uno de los padres debe ser Venezolano'; 
            $scope.showModal = true;

            $timeout(function(){
                $scope.showModal = false;
            }, 3000);

        }else{
        
            if($scope.formSearch.cedulap, $scope.formSearch.letrap){
                $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
                $scope.showModal = true;

                $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                    if(response.errorCode === '00000'){
                        if(response.cedulado.sexo === 'M'){

                            if(response.cedulado.edad >= 18){
                            
                                $scope.formData.fatherId = response.cedulado.idpersona; 
                                $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);


                            }else{

                                $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);

                            }

                        }else if(response.cedulado.sexo === 'F'){
                            $scope.searchmsg = "Est&aacute; colocando la c&eacute;dula de un ciudadano femenino.";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);

                        }else{
                            $scope.searchmsg = "No se encontraron resultados";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);
                        }
                        
                    }else{
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                        $scope.searchmsg = response.consumerMessage;
                    }     
                  
                }).error(function(){
                    $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                });
            }
        }
    }


    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.showModal = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){

                    if(response.cedulado.edad >= 18){
                        $scope.formData.legalId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                    }else{

                        $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);

                    }
                  
                }else{

                    $scope.searchmsg = response.consumerMessage;
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                    
                }     
              
            }).error(function(){
                $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                $timeout(function(){
                    $scope.showModal = false;
                }, 3000);
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


    $scope.get_consulados = function(cosede){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
        $scope.cosede = cosede;
    }
    
    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){
        if((form.countryIni && form.state && form.parish && form.town && form.city) && (form.motherId || form.fatherId || form.legalId)) {
            $window.scrollTo(0, 0);
            $scope.step3 = "display:none;";
            $scope.step4 = "display:block;";
        }else{
            if(form.motherId || form.fatherId || form.legalId){
                $scope.showparenterror = false;
            }else{
                $scope.showparenterror = true;
            }
            $scope.$broadcast('show-errors-check-validity');
        }  
    }

     $scope.continuar3 = function(form){
        if(form.currentCity && form.countrySede && form.pCode) {      
            $window.scrollTo(0, 0);
            $scope.step4 = "display:none;";
            $scope.step5 = "display:block;";
        }else{
            $scope.$broadcast('show-errors-check-validity');
        }  
    }



    $scope.guardar = function(form){
        $scope.formData.country = $scope.formData.countryIni;


        if(!$scope.formData.minorId){$scope.formData.minorId = null;}
        if(!$scope.formData.fatherId){$scope.formData.fatherId = null;}
        if(!$scope.formData.motherId){$scope.formData.motherId = null;}
        if(!$scope.formData.legalId){$scope.formData.legalId = null;}
        if(!$scope.formData.name2){$scope.formData.name2 = null;}
        if(!$scope.formData.lastName2){$scope.formData.lastName2 = null;}
        if(!$scope.formData.bDate){$scope.formData.bDate = null;}
        
        if($scope.formData.sedeConsular){
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
                countryIni: $scope.formData.country,
                country: $scope.formData.country,
                parish: $scope.formData.parish,
                state: $scope.formData.state,
                town: $scope.formData.town,
                city: $scope.formData.city,
                currentCity: $scope.formData.currentCity,
                pCode: $scope.formData.pCode,
                countrySede: $scope.formData.countrySede,
                sedeConsular: $scope.formData.sedeConsular
                
            }

            $http.post("api/api.php?opc=sol_ext_menor&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ext");
                }else{
                    //$state.go("saime.solicitud_pasaporte_error_ext");
                    $scope.error_msg = response.consumerMessage; 
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            })

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

    $scope.atras_e = function(){
        $scope.error = false;
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





ctrl.controller('FormRegistroMenorNcExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', '$localStorage', '$window', 'ConsuladosFactory', function($rootScope, $state, $timeout, $scope, $http, $localStorage, $window, ConsuladosFactory) {

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


     $scope.buscar_madre = function() {


        if(($scope.formSearch.letram == "E") && ($scope.formSearch.letrap == "E")){
            $scope.searchmsg = 'Al menos uno de los padres debe ser Venezolano'; 
            $scope.showModal = true;

            $timeout(function(){
                $scope.showModal = false;
            }, 3000);

        }else{

            if($scope.formSearch.cedulam, $scope.formSearch.letram){

                $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
                $scope.showModal = true;

                $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
                    if(response.errorCode === '00000'){
                        if(response.cedulado.sexo === 'F'){

                            if(response.cedulado.edad >= 18){

                                $scope.formData.motherId = response.cedulado.idpersona; 
                                $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido;                         
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);


                            }else{

                                $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);

                            }

                        }else if(response.cedulado.sexo === 'M'){
                            $scope.searchmsg = "Est&aacute; colocando la c&eacute;dula de un ciudadano masculino.";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);

                        }else{
                            $scope.searchmsg = "No se encontraron resultados";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);
                        }

                    }else{
                        $scope.searchmsg = response.consumerMessage;
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                    }     
                  
                }).error(function(){
                    $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                });
            }
        }
    }
    

    $scope.buscar_padre = function(){

        if(($scope.formSearch.letram == "E") && ($scope.formSearch.letrap == "E")){
            $scope.searchmsg = 'Al menos uno de los padres debe ser Venezolano'; 
            $scope.showModal = true;

            $timeout(function(){
                $scope.showModal = false;
            }, 3000);

        }else{
        
            if($scope.formSearch.cedulap, $scope.formSearch.letrap){
                $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
                $scope.showModal = true;

                $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
                    if(response.errorCode === '00000'){
                        if(response.cedulado.sexo === 'M'){

                            if(response.cedulado.edad >= 18){
                            
                                $scope.formData.fatherId = response.cedulado.idpersona; 
                                $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);


                            }else{

                                $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                                $timeout(function(){
                                    $scope.showModal = false;
                                }, 3000);

                            }

                        }else if(response.cedulado.sexo === 'F'){
                            $scope.searchmsg = "Est&aacute; colocando la c&eacute;dula de un ciudadano femenino.";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);

                        }else{
                            $scope.searchmsg = "No se encontraron resultados";
                            $timeout(function(){
                                $scope.showModal = false;
                            }, 3000);
                        }
                        
                    }else{
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                        $scope.searchmsg = response.consumerMessage;
                    }     
                  
                }).error(function(){
                    $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                });
            }
        }
    }


    $scope.buscar_legal = function(){
        
        if($scope.formSearch.cedulal, $scope.formSearch.letral){
            $scope.searchmsg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.showModal = true;

            $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letral, cedula: $scope.formSearch.cedulal}).success(function(response) {
                if(response.errorCode === '00000'){

                    if(response.cedulado.edad >= 18){
                        $scope.formData.legalId = response.cedulado.idpersona; 
                        $scope.formSearch.cedulal = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $scope.searchmsg = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);
                    }else{

                        $scope.searchmsg = "El representante legal que est&aacute; ingresando debe ser mayor de edad"; 
                        $timeout(function(){
                            $scope.showModal = false;
                        }, 3000);

                    }
                  
                }else{

                    $scope.searchmsg = response.consumerMessage;
                    $timeout(function(){
                        $scope.showModal = false;
                    }, 3000);
                    
                }     
              
            }).error(function(){
                $scope.searchmsg = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
                $timeout(function(){
                    $scope.showModal = false;
                }, 3000);
            });

        }
    }



  

    $scope.paises = $localStorage.paises.countryList;


    $scope.get_consulados = function(cosede){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
        $scope.cosede = cosede;
    }


    $scope.continuar1 = function(form){
        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
            $window.scrollTo(0, 0);
            $scope.step1 = "display:none;";
            $scope.step2 = "display:block;";
        }else{
            if(form.motherId || form.fatherId || form.legalId){
                $scope.showparenterror = false;
            }else{
                $scope.showparenterror = true;
            }
            $scope.$broadcast('show-errors-check-validity');
        }  
    }

     $scope.continuar2 = function(form){
        if(form.currentCity && form.countrySede && form.pCode) {     
            $window.scrollTo(0, 0);
            $scope.step2 = "display:none;";
            $scope.step3 = "display:block;";
        }else{
            $scope.$broadcast('show-errors-check-validity');
        }  
    }


    $scope.guardar = function(form){
        $scope.formData.country = $scope.formData.countryIni;
        $scope.formData.nobDate = $scope.formData.bDate.format("dd/mm/yyyy");


        if(!$scope.formData.minorId){$scope.formData.minorId = null;}
        if(!$scope.formData.fatherId){$scope.formData.fatherId = null;}
        if(!$scope.formData.motherId){$scope.formData.motherId = null;}
        if(!$scope.formData.legalId){$scope.formData.legalId = null;}
        if(!$scope.formData.name2){$scope.formData.name2 = null;}
        if(!$scope.formData.lastName2){$scope.formData.lastName2 = null;}

     
        if($scope.formData.sedeConsular){

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
                countryIni: $scope.formData.country,
                country: $scope.formData.country,
                city: $scope.formData.city,
                currentCity: $scope.formData.currentCity,
                pCode: $scope.formData.pCode,
                countrySede: $scope.formData.countrySede,
                sedeConsular: $scope.formData.sedeConsular
                
            }


            $http.post("api/api.php?opc=sol_ext_menor&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ext");
                }else{
                    //$state.go("saime.solicitud_pasaporte_error_ext");
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });

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

    $scope.atras_e = function(){
        $scope.error = false;
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




ctrl.controller('FormRegistroDatosPersonalesExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', '$localStorage', '$window', 'ConsuladosFactory',  function($rootScope, $state, $timeout, $scope, $http, $localStorage, $window, ConsuladosFactory) {
 
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

    $scope.paises = $localStorage.paises.countryList;

    $scope.get_consulados = function(cosede){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
        $scope.cosede = cosede;
    }


    $scope.guardar = function(form){

        if($scope.formData.sedeConsular) {

            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $scope.alldata = {
                
                country: $scope.formData.country,
                city: $scope.formData.city,
                currentCity: $scope.formData.currentCity,
                pCode: $scope.formData.pCode,
                countrySede: $scope.formData.countrySede,
                sedeConsular: $scope.formData.sedeConsular
                
            }

            $http.post("api/api.php?opc=sol_ext_mayor&bcode="+$rootScope.bcode, $scope.alldata).success(function(response) {
                if(response.errorCode === '00000'){
                    $state.go("saime.solicitud_pasaporte_exitoso_ext");
                }else{
                    //$state.go("saime.solicitud_pasaporte_error_ext");
                    $scope.error_msg = response.consumerMessage;
                }
            }).error(function(){
                $scope.error_msg = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
            });
        } 
    }
    
    
    $scope.continuar1 = function(form){
        if(form.country && form.city && form.currentCity && form.pCode && form.countrySede) {
            $window.scrollTo(0, 0);
            $scope.step1 = "display:none;";
            $scope.step2 = "display:block;";
        }else{
            $scope.$broadcast('show-errors-check-validity');
        }  
    }



    $scope.atras1 = function(){
        $scope.step2 = "display:none;";
        $scope.step1 = "display:block;";
    }

    $scope.atras_e = function(){
        $scope.error = false;
    }


}]);
