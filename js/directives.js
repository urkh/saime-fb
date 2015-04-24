var dir = angular.module('app.directives', []);


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