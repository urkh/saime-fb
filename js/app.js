'use strict';

var app = angular.module('app', [
    'ngFacebook',
    'ngAnimate',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'checklist-model',
    'uiGmapgoogle-maps',
    'app.controllers_gen',
    'app.controllers_ven',
    'app.controllers_ext',
    'app.services',
    'app.directives',

  ]);

app.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$facebookProvider',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide,   $facebookProvider) {
        
        app.controller = $controllerProvider.register;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        

        $facebookProvider.setAppId('1540942286154750');
        $facebookProvider.setVersion("v2.1");
        $facebookProvider.setPermissions("public_profile,user_location,user_activities,user_likes,publish_actions,user_friends");

        $urlRouterProvider.otherwise('/saime/auth');
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


            .state('saime.terminos', {
                url: '/terminos',
                templateUrl: 'templates/terminos.html'
            })

            .state('saime.like_page', {
                url: '/like_page',
                templateUrl: 'templates/like_page.html'
            })

            .state('saime.auth', {
                template: '<br><br><br><br><div align="center"><img src="img/icons/ajax-loader.gif" width="25" height="25" /> Cargando, por favor espere...</div>',
                url: '/auth',
                controller: 'AuthCtrl'
            })


            .state('saime.noauth', {
                url: '/noauth',
                templateUrl: 'templates/noauth.html'
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


            
            .state('saime.estado_tramite', {
                url: '/estado_tramite/person/:personId',
                templateUrl: 'templates/estado_tramite.html'
            })



            .state('saime.estado_cita_ven', {
                url: '/estado_cita_ven/planilla/:idPlanillaPasaporte',
                templateUrl: 'templates/venezuela/estado_cita.html'
            })

            .state('saime.estado_cita_ext', {
                url: '/estado_cita_ext/planilla/:idPlanillaPasaporte',
                templateUrl: 'templates/extranjero/estado_cita.html'
            })

            .state('saime.eliminar_cita_ext', {
                url: '/eliminar_cita_ext/planilla/:idPlanillaPasaporte',
                templateUrl: 'templates/extranjero/eliminar_cita.html'
            })

            .state('saime.eliminar_cita_ven', {
                url: '/eliminar_cita_ven/planilla/:idPlanillaPasaporte',
                templateUrl: 'templates/venezuela/eliminar_cita.html'
            })



            .state('saime.lista_tramites', {
                url: '/tramites',
                templateUrl: 'templates/lista_tramites.html'
            })


            .state('saime.mis_solicitudes_ven', {
                url: '/mis_solicitudes_ven',
                templateUrl: 'templates/venezuela/mis_solicitudes.html'
            })

            .state('saime.mis_solicitudes_ext', {
                url: '/mis_solicitudes_ext',
                templateUrl: 'templates/extranjero/mis_solicitudes.html'
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

            .state('saime.olvido_contrasena', {
                url: '/olvido_contrasena',
                templateUrl: 'templates/olvido_contrasena.html'
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



            /* mensajes */

            

            .state('saime.solicitud_pasaporte_exitoso_ven', {
                url: '/registro/solicitud_pasaporte_exitoso_ven',
                templateUrl: 'templates/mensajes/solicitud_pasaporte_exitoso_ven.html'
            })  

            .state('saime.solicitud_pasaporte_error_ven', {
                url: '/registro/solicitud_pasaporte_error_ven',
                templateUrl: 'templates/mensajes/solicitud_pasaporte_error_ven.html'
            })  




            .state('saime.solicitud_pasaporte_exitoso_ext', {
                url: '/registro/solicitud_pasaporte_exitoso_ext',
                templateUrl: 'templates/mensajes/solicitud_pasaporte_exitoso_ext.html'
            })  

            .state('saime.solicitud_pasaporte_error_ext', {
                url: '/registro/solicitud_pasaporte_error_ext',
                templateUrl: 'templates/mensajes/solicitud_pasaporte_error_ext.html'
            })  
            

            .state('saime.registro_usuario_exitoso', {
                url: '/registro_usuario_exitoso',
                templateUrl: 'templates/mensajes/registro_exitoso.html'
            })  

            .state('saime.enviocontrasena', {
                url: '/resetear_contrasena/contrasena_enviada',
                templateUrl: 'templates/mensajes/envio_contrasena.html'
            })
    }
  ]
);



app.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;      
        

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/es_ES/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk')); 



    }
  ]
);
