myApp.factory("appointmentsFactory", function ($http) {

    var factory = {};
    factory.appointments = [];

    // index: Retrieve all appointments from today
    factory.getAppointments = function (callback) {
        $http.get('/api/appointments').then(function (response) {

            factory.appointments = response.data.appointments
            callback(factory.appointments);
        });
    }
    //create appointment
    factory.createAppointment = function (appointment, callback, errorHandler) {
        $http.post('/api/appointments', appointment).then(function (response) {

            if (!response.data.errors) {
                factory.getAppointments(callback);
                errorHandler();
            } else {
                errorHandler(response.data.errors);
            }
        });
    }
    //cancel/delete appointment
    factory.cancelAppointment = function (id, callback, errorHandler) {
        $http.delete('/api/appointments/delete/' + id).then(function (response) {
            if (!response.data.errors) {
                factory.getAppointments(callback);
            } else {
                errorHandler(response.data.errors);
            }

        });
    }
        return factory;
    });