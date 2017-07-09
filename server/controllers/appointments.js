var mongoose = require('mongoose');
// store our models in variables
var User = mongoose.model('User');
var Appointment = mongoose.model('Appointment');
module.exports = {
    index: function (req, res) {
        // res.json({ messages: "reached api/discussion index route" });
        var promise = Appointment.find({
            date: {
                $gte: Date.now()
            }
        }).populate('_user');
        promise.then(function (appointments) {
            if (appointments) {
                console.log('found appointments');
                res.json({ appointments: appointments });
            } else {
                console.log('no appointments found');
                res.json({ message: "no appointments found" });
            }
        }).catch(function (err) {
            console.log('err with server or db')
            res.json({});
        })
    },
    create: function (req, res) {
        var newAppointment = new Appointment(req.body);
        var appDate = newAppointment.date;
        Appointment.find({ 'date': appDate }, function (err, appointments) {
            if (appointments) {
                if (appointments.length > 2) {
                    res.json({ errors: "there are already 3 appointments on this day, please choose another day" });
                } else {
                    // save triggers validations then pre then saves to db
                    newAppointment.save(function (err) {
                        if (err) {
                            res.json({ errors: err });
                        } else {
                            res.json({ appointment: newAppointment });
                        }
                    })
                }
            } else {
                // save triggers validations then pre then saves to db
                    newAppointment.save(function (err) {
                        if (err) {
                            res.json({ errors: err });
                        } else {
                            res.json({ appointment: newAppointment });
                        }
                    })
            }
        });

    },
    deleteAppointment: function (req, res) {
        console.log("reached deleteAppointment");
        var appointment_id = req.params.id;
        //find a way to pop from user array as well
        // var user_email = req.body._user;
        Appointment.remove({ _id: appointment_id }, function (err, message) {
            if (err) {
                console.log(err);
                res.json({ errors: err });
            } else {
                console.log("deleted");
                res.json({ message: "success" });
            }
        });
    },

}