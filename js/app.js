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
    'pascalprecht.translate',
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

.config(['$translateProvider', function($translateProvider){

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.json'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('es');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

}])

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
.constant('JQ_CONFIG', {
    easyPieChart:   ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['js/jquery/charts/flot/jquery.flot.min.js', 
                        'js/jquery/charts/flot/jquery.flot.resize.js',
                        'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'js/jquery/charts/flot/jquery.flot.spline.js',
                        'js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['js/jquery/nestable/jquery.nestable.js',
                        'js/jquery/nestable/nestable.css'],
    filestyle:      ['js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['js/jquery/slider/bootstrap-slider.js',
                        'js/jquery/slider/slider.css'],
    chosen:         ['js/jquery/chosen/chosen.jquery.min.js',
                        'js/jquery/chosen/chosen.css'],
    TouchSpin:      ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['js/jquery/datatables/jquery.dataTables.min.js',
                        'js/jquery/datatables/dataTables.bootstrap.js',
                        'js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['js/jquery/jvectormap/jquery-jvectormap.min.js', 
                        'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'js/jquery/jvectormap/jquery-jvectormap.css'],
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