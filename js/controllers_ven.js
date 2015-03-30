'use strict';


angular.module('app.controllers_ven', [])


.controller('FormRegistroMenorCCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $timeout, $scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {
    
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
            }else{
              $scope.error = res.consumerMessage;
            }
          }).error(function(){
            $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
          })

        }else{
          $scope.error = response.consumerMessage;
        }
      }).error(function(){
        $scope.error = response.consumerMessage;
      })
    }



    $scope.buscar_madre = function() {
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;
      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letram, cedula: $scope.formSearch.cedulam}).success(function(response) {
        if(response.errorCode === '00000'){
          if(response.cedulado.sexo === 'F'){
            $scope.formData.motherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
          }else{
            $scope.error = "No se encontraron resultados";
          }

        }else{
          $scope.error = response.consumerMessage;
        }     
        
      }).error(function(){
        $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
      })
    }

    $scope.buscar_padre = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;

      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
        if(response.errorCode === '00000'){
          if(response.cedulado.sexo === 'M'){
            $scope.formData.fatherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);

          }else{
            $scope.error = "No se encontraron resultados";
          }
            
        }else{
          $scope.error = response.consumerMessage;
        }     
        
      }).error(function(){
        $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
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
            
          }else{
            $scope.error = response.consumerMessage;
          }     
        
      }).error(function(){
        $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
      })
    }



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.state);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);

    }

    $scope.get_parroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.town);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.get_cmunicipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_cparroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.currentTown);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_oficinas = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.oficinas = OficinasFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    



    $scope.continuar1 = function(){
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
    }


    $scope.continuar2 = function(form){

      if($scope.formData.minorType==='3'){
        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
          $scope.step3 = "display:none;";
          $scope.step4 = "display:block;";
        }else{
          $scope.showModal = true;
          $scope.error = "Debe llenar los campos correctamente."
        }
      }else{
        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
          $scope.step3 = "display:none;";
          $scope.step4 = "display:block;";
        }else{
          $scope.showModal = true;
          $scope.error = "Debe llenar los campos correctamente."
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
          $scope.showModal = true;
          $scope.error = "Debe llenar los campos correctamente."
        }  
      }



    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString() || "";
      $scope.formData.country = $scope.formData.countryIni;
      $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy")
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=sol_ven_menor&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ven");
          }else{
            //$state.go("saime.solicitud_pasaporte_error_ven");
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }
        }).error(function(){
          $scope.showModal = true;
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
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





.controller('FormRegistroMenorNcCtrl', ['$rootScope', '$timeout', '$scope', '$http', '$state', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $timeout, $scope, $http, $state, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {
    
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
          if(response.cedulado.sexo === 'F'){
            $scope.formData.motherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulam = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
          }else{
            $scope.error = "No se encontraron resultados";
          }
        }else{
          $scope.error = response.consumerMessage;
        }     
        
      }).error(function(){
        $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
      })
    }



    $scope.buscar_padre = function(){
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...'; 
      $scope.showModal = true;

      $http.post("api/api.php?opc=get_cedula&bcode="+$rootScope.bcode, {letra: $scope.formSearch.letrap, cedula: $scope.formSearch.cedulap}).success(function(response) {
        if(response.errorCode === '00000'){
          if(response.cedulado.sexo === 'M'){
            $scope.formData.fatherId = response.cedulado.idpersona; 
            $scope.formSearch.cedulap = response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            
            $scope.error = "<b>Resultado:</b> " + response.cedulado.numerocedula +" - "+response.cedulado.primernombre+" "+response.cedulado.primerapellido; 
            $timeout(function(){
              $scope.showModal = false;
            }, 1500);
          }else{
            $scope.error = "No se encontraron resultados";
          }
            
        }else{
          $scope.error = response.consumerMessage;
        }     
        
      }).error(function(){
          $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
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
            
          }else{
            $scope.error = response.consumerMessage;
          }     
        
      }).error(function(){
        $scope.error = 'Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.';
      })
    }



    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })

    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.estados = response.stateList
    })


    $scope.get_municipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.state);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);

    }


    $scope.get_parroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.town);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.get_cmunicipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_cparroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.currentTown);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_oficinas = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.oficinas = OficinasFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }




    $scope.continuar1 = function(form){



      if(form.minorType=='4'){

        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.city) && (form.motherId || form.fatherId || form.legalId)) {
          $scope.step3 = "display:none;";
          $scope.step4 = "display:block;";
        }else{
          $scope.showModal = true;
          $scope.error = "Debe llenar los campos correctamente."
        }
      }else{
        if((form.name1 && form.lastName1 && form.bDate && form.gender && form.countryIni && form.state && form.town && form.parish && form.city) && (form.motherId || form.fatherId || form.legalId)) {
          $scope.step1 = "display:none;";
          $scope.step2 = "display:block;";
        }else{
          $scope.showModal = true;
          $scope.error = "Debe llenar los campos correctamente."
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
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
      }  
    }


    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString() || "";
      $scope.formData.country = $scope.formData.countryIni;
      $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=sol_ven_menor&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ven");
          }else{
            //$state.go("saime.solicitud_pasaporte_error_ven");
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }
        }).error(function(){
          $scope.showModal = true;
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
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



  .controller('FormRegistroDatosPersonalesVenCtrl', ['$rootScope', '$state', '$scope', '$http', 'MunicipiosFactory', 'ParroquiasFactory', 'OficinasFactory', 'CodigoTelfFactory', function($rootScope, $state, $scope, $http, MunicipiosFactory, ParroquiasFactory, OficinasFactory, CodigoTelfFactory) {

    if(!$rootScope.authenticated){
      $state.go('saime.autenticacion');
    }

    $("#header_status").hide();
    $scope.formData = {};
    $scope.formNoData = {};

    $scope.codigos = CodigoTelfFactory;

    $http.get("api/api.php?opc=get_paises&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.paises = response.countryList
    })


    $http.get("api/api.php?opc=get_estados&bcode="+$rootScope.bcode).success(function(response) { 
      $scope.estados = response.stateList;
    })



    $scope.get_municipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.state);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);

    }

    $scope.get_parroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.town);
      $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.get_cmunicipios = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.municipios = MunicipiosFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_cparroquias = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.parroquias = ParroquiasFactory($scope.formData.currentTown);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }

    $scope.get_oficinas = function(){
      $scope.showModal = true;
      $scope.error = '<img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...';
      $scope.oficinas = OficinasFactory($scope.formData.currentState);
       $timeout(function(){
        $scope.showModal = false;
      }, 1500);
    }


    $scope.guardar = function(form){
      $scope.formData.offices = $scope.formData.offices.toString() || "";
      $scope.formData.country = $scope.formData.countryIni;
      $scope.formData.bDate = $scope.formData.bDate.format("dd/mm/yyyy");
      
      
      if($scope.formData.offices != ""){

        $http.post("api/api.php?opc=reg_persona&bcode="+$rootScope.bcode, $scope.formData).success(function(response) {
          if(response.errorCode === '00000'){
            $state.go("saime.solicitud_pasaporte_exitoso_ven");
          }else{
            $scope.showModal = true;
            $scope.error = response.consumerMessage;
          }
        }).error(function(){
          $scope.showModal = true;
          $scope.error = "Ha ocurrido un error de comunicación con el servidor, por favor intente de nuevo.";
        })

      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente.";
      }  
    }
    
    
    $scope.continuar1 = function(form){
      if(form.countryIni && form.state && form.parish && form.town && form.city) {
        $scope.step1 = "display:none;";
        $scope.step2 = "display:block;";
      }else{
        $scope.showModal = true;
        $scope.error = "Debe llenar los campos correctamente."
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



  }])


  ;
