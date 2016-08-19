'use strict';

var treatments = {
    doctor: "flu shot",
    vet: "shots and a chew toy"
}

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/people',
        handler: function (request, reply) {

            reply({
                greeting: 'Hi ' + request.payload.name + '!',
                patients: _mapPatientsToTreatment(request.payload.patients, request.payload.job)
            });

        }
    });

    next();

};

function _mapPatientsToTreatment(patients, job) {
    var treatment = treatments[job.toLowerCase()],
        treatmentsToPatients = [];

    for (var i = 0; i < patients.length; i++) {
        var patient = patients[i];
        treatmentsToPatients.push({
            patient: patient,
            treatment: treatment
        })
    };

    return treatmentsToPatients;
}

exports.register.attributes = {
    name: 'people'
};
