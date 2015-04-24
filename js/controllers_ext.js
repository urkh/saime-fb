'use strict';



var ctrl = angular.module('app.controllers_ext', []);



ctrl.controller('FormRegistroMenorCExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'ConsuladosFactory', function($rootScope, $state, $timeout, $scope, $http, ConsuladosFactory) {

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



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
        $scope.paises = response.countryList
    })

    $scope.get_consulados = function(){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
    }
    
    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){
        if((form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
            $scope.step3 = "display:none;";
            $scope.step4 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }

     $scope.continuar3 = function(form){
        if(form.currentCity && form.countrySede && form.pCode) {      
            $scope.step4 = "display:none;";
            $scope.step5 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }



    $scope.guardar = function(form){
        $scope.formData.country = $scope.formData.countryIni;
        
        if($scope.formData.sedeConsular){
            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $scope.alldata = {
                
                minorType: $scope.formData.minorType,
                minorId: $scope.formData.minorId,
                motherId: $scope.formData.motherId,
                fatherId: $scope.formData.fatherId,
                legalId: $scope.formData.legalId,
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





ctrl.controller('FormRegistroMenorNcExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'ConsuladosFactory', function($rootScope, $state, $timeout, $scope, $http, ConsuladosFactory) {

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


    $scope.get_consulados = function(){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
    }


    $scope.continuar1 = function(form){
        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
            $scope.step1 = "display:none;";
            $scope.step2 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }

     $scope.continuar2 = function(form){
        if(form.currentCity && form.countrySede && form.pCode) {     
            $scope.step2 = "display:none;";
            $scope.step3 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
        }  
    }


    $scope.guardar = function(form){
        $scope.formData.country = $scope.formData.countryIni;
        $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");

     
        if($scope.formData.sedeConsular){

            $scope.error_msg = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
            $scope.error = true;

            $scope.alldata = {
                
                minorType: $scope.formData.minorType,
                minorId: $scope.formData.minorId,
                motherId: $scope.formData.motherId,
                fatherId: $scope.formData.fatherId,
                legalId: $scope.formData.legalId,
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


    $scope.date_clear = function () {
        $scope.dt = null;
    }
  
    $scope.date_open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    }


    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    }

    $scope.format = 'dd/MM/yyyy';

}]);




ctrl.controller('FormRegistroDatosPersonalesExtCtrl', ['$rootScope', '$state', '$timeout', '$scope', '$http', 'ConsuladosFactory',  function($rootScope, $state, $timeout, $scope, $http, ConsuladosFactory) {
 
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


    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
        $scope.paises = response.countryList
    })

    $scope.get_consulados = function(){
        $scope.consulados = ConsuladosFactory($scope.formData.countrySede);
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
            $scope.step1 = "display:none;";
            $scope.step2 = "display:block;";
        }else{
            $scope.showErrorsCheckValidity = true;
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
