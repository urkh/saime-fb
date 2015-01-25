'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers'
  ])
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;        
    }
  ]
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $urlRouterProvider.otherwise('/saime/inicio');
        $stateProvider            
            .state('saime', {
                abstract: true,
                url: '/saime',
                templateUrl: 'templates/base.html'
            })

            .state('saime.inicio', {
                url: '/inicio',
                templateUrl: 'templates/inicio.html'
            })

            .state('saime.solicitud', {
                url: '/solicitud',
                templateUrl: 'templates/solicitud.html'
            })

            .state('saime.solicitud_ven', {
                url: '/solicitud/venezolanos',
                templateUrl: 'templates/solicitud_ven.html'
            })


            .state('saime.solicitud_ext', {
                url: '/solicitud/extranjeros',
                templateUrl: 'templates/solicitud_ext.html'
            })


            .state('saime.solicitudes_menores', {
                url: '/solicitudes/menores',
                templateUrl: 'templates/solicitudes_menores.html'
            })


            .state('saime.buscar_menor_ven', {
                url: '/buscar/menor/venezolano',
                templateUrl: 'templates/buscar_menor_ven.html'
            })

            .state('saime.buscar_menor_ext', {
                url: '/buscar/menor/extranjero',
                templateUrl: 'templates/buscar_menor_ext.html'
            })

            .state('saime.buscar_menor_ven_nc', {
                url: '/buscar/menor_nc/venezolano',
                templateUrl: 'templates/buscar_menor_ven_nc.html'
            })

            .state('saime.buscar_menor_ext_nc', {
                url: '/buscar/menor_nc/extranjero',
                templateUrl: 'templates/buscar_menor_ext_nc.html'
            })

            .state('saime.tramites', {
                url: '/tramites',
                templateUrl: 'templates/tramites.html'
            })

            .state('saime.pasaporte_domicilio', {
                url: '/pasaporte_domicilio',
                templateUrl: 'templates/pasaporte_domicilio.html'
            })

            .state('saime.pasaporte_domicilio_exitoso', {
                url: '/pasaporte_domicilio/exitoso',
                templateUrl: 'templates/pasaporte_domicilio_exitoso.html'
            })

            .state('saime.otros_tramites', {
                url: '/otros_tramites',
                templateUrl: 'templates/otros_tramites.html'
            })

            .state('saime.noticias', {
                url: '/noticias',
                templateUrl: 'templates/noticias.html'
            })

            .state('saime.reclamos', {
                url: '/reclamos',
                templateUrl: 'templates/reclamos.html'
            })

            .state('saime.oficinas', {
                url: '/oficinas',
                templateUrl: 'templates/oficinas.html'
            })

            .state('saime.login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })

    }
  ]
)



.constant('JQ_CONFIG', {
 
    slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],

    vectorMap:      ['js/jquery/jvectormap/jquery.vmap.min.js', 
                    'js/jquery/jvectormap/maps/jquery.vmap.world.js',
                   // 'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                    'js/jquery/jvectormap/jqvmap.css'],

    footable:       ['js/jquery/footable/footable.all.min.js',
                        'js/jquery/footable/footable.core.css']

    }
)

.constant('MODULE_CONFIG', {
    select2:        ['js/jquery/select2/select2.css',
                        'js/jquery/select2/select2-bootstrap.css',
                        'js/jquery/select2/select2.min.js',
                        'js/modules/ui-select2.js']
    }
)
;