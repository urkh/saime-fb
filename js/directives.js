var dir = angular.module('app.directives', []);


dir.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              //'<div class="modal-header">' + 
                //'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
               // '<h4 class="modal-title">{{obj.prop}}</h4>' + 
              //'</div>' + 
              '<div class="modal-body" align="center" ng-bind-html="error">{{error}}  </div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      //transclude: true,
      //backdrop: 'static',
      replace:true,
      scope:true,
      //scope: { obj: '=' },
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });




dir.directive('vldTexto', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {
            if(event.which >= 48 && event.which <= 57){
                event.preventDefault();
            }else{
                if(event.target.value.length >= 30) {
                    event.preventDefault();
                }
            }
        });
    };
});



dir.directive('vldCedula', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {

            if((event.which >= 48 && event.which <= 57) || (event.which == 8)){
                if(event.target.value.length >= 10) {
                    event.preventDefault();
                }
            }else{
                event.preventDefault();
            }
        });
    };
});



dir.directive('vldTelefono', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {

            if((event.which >= 48 && event.which <= 57) || (event.which == 8)){
                if(event.target.value.length >= 8) {
                    event.preventDefault();
                }
            }else{
                event.preventDefault();
            }
        });
    };
});

dir.directive('vldPcode', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {

            if((event.which >= 48 && event.which <= 57) || (event.which == 8)){
                if(event.target.value.length >= 5) {
                    event.preventDefault();
                }
            }else{
                event.preventDefault();
            }
        });
    };
});