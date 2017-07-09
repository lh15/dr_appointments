myApp.controller('appointmentsController', ['$scope', 'appointmentsFactory', '$location', '$cookies', '$route', function ($scope, appointmentsFactory, $location, $cookies, $route) {

    $scope.newAppointment = {};
    $scope.search = {};
    $scope.appointments = [];
    $scope.currentDate = new Date(); 
    $scope.validationErrors = null;
    var currentUser = $cookies.get('currentUser');
    if (!currentUser) {

        $location.path("/login");
    } else {
        $scope.currentUser = JSON.parse(currentUser);

    }
    var errorHandler = function (errors) {
        if (errors) {
            console.log(errors);
            $scope.validationErrors = errors;
        } else {
            $location.path("/dashboard");
        }




    }
    function setAppointments(data) {
        $scope.appointments = data;
        $scope.newAppointment = {};
    }

    $scope.index = function () {

        appointmentsFactory.getAppointments(setAppointments);
    }
    $scope.index();
    $scope.oneDay = function () {
        console.log($scope.currentDate);
        console.log($scope.currentDate -1);

    }
    $scope.oneDay();
    $scope.createAppointment = function () {
        $scope.newAppointment._user = $scope.currentUser._id;
        appointmentsFactory.createAppointment($scope.newAppointment, setAppointments, errorHandler);
        $scope.validationErrors = null;

    }

    $scope.cancelAppointment = function (id) {

        appointmentsFactory.cancelAppointment(id, setAppointments, errorHandler);
    }

    $scope.logOut = function () {
        $cookies.remove('currentUser');
        $location.path("/login");
    }
}])