// require mongoose
var mongoose = require('mongoose');
// // define Schema variable
var Schema = mongoose.Schema;
//define topic schema

var AppointmentSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date, required: true, validate: {
            validator: function (value) {
                return value >= Date.now();
            }
        }
    },
    time: {
        type: String, required: true
    },

    complaint: {
        type: String,
        required: true,
        minlength: 10
    },

}, { timestamps: true });
// register the schemas as models
// set our models by passing them their respective Schemas

mongoose.model('Appointment', AppointmentSchema);

// store our models in variables

var Appointment = mongoose.model('Appointment');