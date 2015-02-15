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
    'ngSanitize',
    'ui.select',
    'ui.validate',

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
        //app.directive  = $compileProvider.directive;
        //app.filter     = $filterProvider.register;
        //app.factory    = $provide.factory;
        //app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $urlRouterProvider.otherwise('/saime/login');
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

            .state('saime.menu_solicitud', {
                url: '/solicitud',
                templateUrl: 'templates/menu_solicitud.html'
            })



            /* personas en venezuela */
            .state('saime.menu_solicitud_ven', {
                url: '/venezuela/solicitud/',
                templateUrl: 'templates/venezuela/menu_solicitud.html'
            })

            .state('saime.menu_solicitudes_menores_ven', {
                url: '/venezuela/solicitudes/menores/',
                templateUrl: 'templates/venezuela/menu_solicitudes_menores.html'
            })

            .state('saime.registro_menor_c_ven', {
                url: '/venezuela/registro/menor_c/',
                templateUrl: 'templates/venezuela/registro_menor_c.html'
            })

            .state('saime.registro_menor_nc_ven', {
                url: '/venezuela/registro/menor_nc/',
                templateUrl: 'templates/venezuela/registro_menor_nc.html'
            })


            .state('saime.registro_menor_nat_c_ven', {
                url: '/venezuela/registro/menor_nat_c/',
                templateUrl: 'templates/venezuela/registro_menor_nat_c.html'
            })

            .state('saime.registro_menor_nat_nc_ven', {
                url: '/venezuela/registro/menor_nat_nc/',
                templateUrl: 'templates/venezuela/registro_menor_nat_nc.html'
            })


            .state('saime.registro_datos_personales_ven', {
                url: '/venezuela/registro/datos_personales',
                templateUrl: 'templates/venezuela/registro_datos_personales.html'
            })







            /* personas en el exterior */
            .state('saime.menu_solicitud_ext', {
                url: '/extranjero/solicitud/',
                templateUrl: 'templates/extranjero/menu_solicitud.html'
            })

            .state('saime.menu_solicitudes_menores_ext', {
                url: '/extranjero/solicitudes/menores/',
                templateUrl: 'templates/extranjero/menu_solicitudes_menores.html'
            })


            .state('saime.registro_menor_c_ext', {
                url: '/extranjero/registro/menor_c/',
                templateUrl: 'templates/extranjero/registro_menor_c.html'
            })

            .state('saime.registro_menor_nc_ext', {
                url: '/extranjero/registro/menor_nc/',
                templateUrl: 'templates/extranjero/registro_menor_nc.html'
            })


            .state('saime.registro_menor_nat_c_ext', {
                url: '/extranjero/registro/menor_nat_c/',
                templateUrl: 'templates/extranjero/registro_menor_nat_c.html'
            })

            .state('saime.registro_menor_nat_nc_ext', {
                url: '/extranjero/registro/menor_nat_nc/',
                templateUrl: 'templates/extranjero/registro_menor_nat_nc.html'
            })


            .state('saime.registro_datos_personales_ext', {
                url: '/extranjero/registro/datos_personales',
                templateUrl: 'templates/extranjero/registro_datos_personales.html'
            })












            

            .state('saime.buscar_menor_ven_ubicacion_nc', {
                url: '/buscar/menor_nc/venezolano/ubicacion',
                templateUrl: 'templates/buscar_menor_ven_ubicacion_nc.html'
            })



            

            .state('saime.tramites', {
                url: '/estado_tramite',
                templateUrl: 'templates/estado_tramite.html'
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

            .state('saime.autenticacion', {
                url: '/autenticacion',
                templateUrl: 'templates/autenticacion.html'
            })

            .state('saime.olvido', {
                url: '/resetear_contrasena',
                templateUrl: 'templates/olvido_contrasena.html'
            })

            .state('saime.enviocontrasena', {
                url: '/resetear_contrasena/contrasena_enviada',
                templateUrl: 'templates/envio_contrasena.html'
            })
            
            .state('saime.registro', {
                url: '/registro',
                templateUrl: 'templates/registro.html'
            })


            /* paginas de ubicacion */

            .state('saime.ubicar', {
                url: '/ubicar',
                templateUrl: 'templates/ubicar.html'
            })

            .state('saime.ubicar_regionales', {
                url: '/ubicar/regionales',
                templateUrl: 'templates/ubicar_regionales.html'
            })

            .state('saime.ubicar_info', {
                url: '/ubicar/info',
                templateUrl: 'templates/ubicar_info.html'
            })











            

            /*.state('saime.registro_datos_personales_ubicacion', {
                url: '/registro/datos_personales/ubicacion',
                templateUrl: 'templates/registro_datos_personales_ubicacion.html'
            })

            .state('saime.registro_datos_personales_oficinas', {
                url: '/registro/datos_personales/oficinas',
                templateUrl: 'templates/registro_datos_personales_oficinas.html'
            })

            .state('saime.registro_datos_personales_exitoso', {
                url: '/registro/datos_personales/exitoso',
                templateUrl: 'templates/registro_personales_exitoso.html'
            })  

            .state('saime.solicitud_ya_existe', {
                url: '/solicitud/ya_existe',
                templateUrl: 'templates/solicitud_pasaporte_ya_existe.html'
            })

            .state('saime.solicitud_ext_ya_existe', {
                url: '/solicitud/extranjeros/ya_existe',
                templateUrl: 'templates/solicitud_ext_pasaporte_ya_existe.html'
            })*/

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