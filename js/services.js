'use strict';

/* Services */


// Demonstrate how to register services
angular.module('app.services', ['ngResource'])
//var baseUrl = 'http://localhost:8080';



/*

.factory('DummyFactory', function ($resource) {
	return $resource(baseUrl + '/ngdemo/web/dummy', {}, {
		query: { method: 'GET', params: {} }
	})
})


*/

.factory('UsersFactory', function ($resource) {
	return $resource('/ngdemo/web/users', {}, {
		query: { method: 'GET', isArray: true },
		create: { method: 'POST' }
	})
})


/*
.factory('UsersFactory', function ($resource) {
    return $resource('/ngdemo/rest/users', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
})


.factory('UserFactory', function ($resource) {
	return $resource(baseUrl + '/ngdemo/web/users/:id', {}, {
		show: { method: 'GET' },
		update: { method: 'PUT', params: {id: '@id'} },
		delete: { method: 'DELETE', params: {id: '@id'} }
	})
});

*/


