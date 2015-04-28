var service = angular.module('app.services', ['ngResource']);

service.factory("HeaderFactory", function(){

  return {header_status: null }

});




service.factory('MunicipiosFactory', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {
	
    return function(state){

    	municipios = [];
        response = $localStorage.municipios;
	    for(var i=0; i < response.townList.length; i++){        
	    	if(response.townList[i].identidadfederal == state ){
	        	municipios.push(response.townList[i]);
	        }
	    }

	    return municipios;
    }

}]);



service.factory('ParroquiasFactory', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {
	
    return function(town){

    	parroquias = [];
        response = $localStorage.parroquias;
	    for(var i=0; i < response.parishList.length; i++){        
          	if(response.parishList[i].idmunicipio == town ){
            	parroquias.push(response.parishList[i]);
          	}
        }

	    return parroquias;
    }

}]);


service.factory('OficinasFactory', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {
    
    return function(state){

        //oficinas = [];
        $http.post("api/api.php?opc=get_oficina_quota&bcode="+$rootScope.bcode, {identidadfederal:state}).success(function(response) { 

            oficinas = response.pronosticosestadoList;

            return oficinas;
        });
    }

}]);



service.factory('OficinasLFactory', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {
	
    return function(state){

    	oficinas = [];
        response = $localStorage.oficinas;

	    for(var i=0; i < response.officeList.length; i++){        
          	if(response.officeList[i].idestado == state ){
            	oficinas.push(response.officeList[i]);
          	}
        }

	    return oficinas;
    }

}]);


service.factory('ConsuladosFactory', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {
	
    return function(country){

    	consulados = [];
        response = $localStorage.consulados;

	    for(var i=0; i < response.consularList.length; i++){        
          	if(response.consularList[i].idpais == country ){
            	consulados.push(response.consularList[i]);
          	}
        }

	    return consulados;
    }

}]);



service.factory("CodigoCelFactory", function(){

    return [

        {numero: '0412'},
        {numero: '0414'},
        {numero: '0416'},
        {numero: '0424'},
        {numero: '0426'}
    ]

});




service.factory("CodigoTelfFactory", function(){

  return [
  	
    
    {numero: '0212'},
    {numero: '0213'},
    {numero: '0214'},
    {numero: '0215'},
    {numero: '0216'},
    {numero: '0217'},
    {numero: '0218'},
    {numero: '0219'},
    {numero: '0220'},
    {numero: '0221'},
    {numero: '0222'},
    {numero: '0223'},
    {numero: '0224'},
    {numero: '0225'},
    {numero: '0226'},
    {numero: '0227'},
    {numero: '0228'},
    {numero: '0229'},
    {numero: '0230'},
    {numero: '0231'},
    {numero: '0232'},
    {numero: '0233'},
    {numero: '0234'},
    {numero: '0235'},
    {numero: '0236'},
    {numero: '0237'},
    {numero: '0238'},
    {numero: '0239'},
    {numero: '0240'},
    {numero: '0241'},
    {numero: '0242'},
    {numero: '0243'},
    {numero: '0244'},
    {numero: '0245'},
    {numero: '0246'},
    {numero: '0247'},
    {numero: '0248'},
    {numero: '0249'},
    {numero: '0250'},
    {numero: '0251'},
    {numero: '0252'},
    {numero: '0253'},
    {numero: '0254'},
    {numero: '0255'},
    {numero: '0256'},
    {numero: '0257'},
    {numero: '0258'},
    {numero: '0259'},
    {numero: '0260'},
    {numero: '0261'},
    {numero: '0262'},
    {numero: '0263'},
    {numero: '0264'},
    {numero: '0265'},
    {numero: '0266'},
    {numero: '0267'},
    {numero: '0268'},
    {numero: '0269'},
    {numero: '0270'},
    {numero: '0271'},
    {numero: '0272'},
    {numero: '0273'},
    {numero: '0274'},
    {numero: '0275'},
    {numero: '0276'},
    {numero: '0277'},
    {numero: '0278'},
    {numero: '0279'},
    {numero: '0280'},
    {numero: '0281'},
    {numero: '0282'},
    {numero: '0283'},
    {numero: '0284'},
    {numero: '0285'},
    {numero: '0286'},
    {numero: '0287'},
    {numero: '0288'},
    {numero: '0289'},
    {numero: '0290'},
    {numero: '0291'},
    {numero: '0292'},
    {numero: '0293'},
    {numero: '0294'},
    {numero: '0295'},
    {numero: '0296'},
    {numero: '0297'},
    {numero: '0298'},
    {numero: '0299'}

  ]

});