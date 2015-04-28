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
              '<div class="modal-body" align="center" ng-bind-html="searchmsg">{{searchmsg}}  </div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      replace:true,
      scope:true,
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



dir.directive('focus', ['$timeout', function($timeout) {
    return {
        scope : {
            trigger : '@focus'
        },
        link : function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
}]);




dir.directive('fbLikebox', ['$timeout', '$facebook', function($timeout, $facebook) {
    return {
        restrict: 'E',
        templateUrl: "templates/_fblikebtn.html",
        scope: { fbid: '='},
        link: function($scope, $element, $attrs) {
            
            $facebook.promise.then(function(FB) {
                $timeout(function() {
                    return FB.XFBML.parse($element[0]);    
                }, 15, false);
            });
                
            
        }
    };
}]);



dir.directive('showErrors', function() {
    return {
      restrict: 'A',
      require: '^form',
      link: function (scope, el, attrs, formCtrl) {
        var inputEl   = el[0].querySelector("[name]");
        var inputNgEl = angular.element(inputEl);
        var inputName = inputNgEl.attr('name');
        
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
        
        scope.$watch(function() {
          return scope.showErrorsCheckValidity;
        }, function(newVal, oldVal) {
          if (!newVal) { return; }
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
      }
    }
});


dir.directive('vldTexto', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {
            if(event.which >= 48 && event.which <= 57){
                event.preventDefault();

            }else{
                if(event.target.value.length > 31) {
                   var input = element.context.value;
                   element.context.value = input.substring(0, input.length-1);
                }
            }
        });
    };
});



dir.directive('vldCedula', function () {
    return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {

            if((event.which >= 48 && event.which <= 57) || (event.which == 8) || (event.which >= 96 && event.which <= 105)){
                if(event.target.value.length >= 10) {
                    //event.preventDefault();
                    var input = element.context.value;
                    element.context.value = input.substring(0, input.length-1);
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

            if((event.which >= 48 && event.which <= 57) || (event.which == 8) || (event.which >= 96 && event.which <= 105)){
                if(event.target.value.length >= 8) {
                    //event.preventDefault();
                    var input = element.context.value;
                    element.context.value = input.substring(0, input.length-1);
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
                    //event.preventDefault();
                    var input = element.context.value;
                    element.context.value = input.substring(0, input.length-1);
                }
            }else{
                event.preventDefault();
            }
        });
    };
});