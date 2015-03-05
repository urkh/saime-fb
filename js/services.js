var services = angular.module('app.services', ['ngResource']);

services.factory("HeaderFactory", function(){

  return {header_status: null }

});



services.factory('MunicipiosFactory', ['$http', function($http) {
	
    return function(state){

    	municipios = [];

		$http.get("api/api.php?opc=get_municipios").success(function(response) { 
		    for(var i=0; i < response.townList.length; i++){        
		    	if(response.townList[i].identidadfederal == state ){
		        	municipios.push(response.townList[i]);
		        }
		    }
    	})

	    return municipios;
    }

}]);



services.factory('ParroquiasFactory', ['$http', function($http) {
	
    return function(town){

    	parroquias = [];

		$http.get("api/api.php?opc=get_parroquias").success(function(response) { 
		    for(var i=0; i < response.parishList.length; i++){        
	          	if(response.parishList[i].idmunicipio == town ){
	            	parroquias.push(response.parishList[i]);
	          	}
	        }
    	})

	    return parroquias;
    }

}]);





services.factory('OficinasFactory', ['$http', function($http) {
	
    return function(state){

    	oficinas = [];

		$http.get("api/api.php?opc=get_oficinas").success(function(response) { 
		    for(var i=0; i < response.officeList.length; i++){        
	          	if(response.officeList[i].idestado == state ){
	            	oficinas.push(response.officeList[i]);
	          	}
	        }
    	})

	    return oficinas;
    }

}]);


services.factory('ConsuladosFactory', ['$http', function($http) {
	
    return function(country){

    	consulados = [];

		$http.get("api/api.php?opc=get_consulados").success(function(response) { 
		    for(var i=0; i < response.consularList.length; i++){        
	          	if(response.consularList[i].idpais == country ){
	            	consulados.push(response.consularList[i]);
	          	}
	        }
    	})

	    return consulados;
    }

}]);



services.factory("CodigoTelfFactory", function(){

  return [
  	{numero: '0412'},
    {numero: '0414'},
    {numero: '0416'},
    {numero: '0424'},
    {numero: '0426'}
  ]

});