var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var appointments = require('../controllers/appointments.js');
module.exports = function (app) {
    //register user
    app.post("/api/register", users.register);
    //login user
    app.post("/api/login", users.login);

    //index route to get all appointments from today and on
    app.get('/api/appointments', appointments.index);
    //create appointment
    app.post("/api/appointments", appointments.create);

    app.delete("/api/appointments/delete/:id", appointments.deleteAppointment);


}
