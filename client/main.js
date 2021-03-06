console.log("reached script");
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMessages']);
// -------------------------- Client Routes -----------------------------
myApp.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'appointmentsController'
        })
        .when('/new_appointment', {
            templateUrl: 'partials/newAppointment.html',
            controller: 'appointmentsController'
        })
        .when('/', {
            templateUrl: 'partials/dashboard.html',
            controller: 'appointmentsController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
//directive to compare passwords and confirm match from stackoverflow
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

myApp.directive("compareTo", compareTo);


