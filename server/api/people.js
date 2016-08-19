'use strict';

const treatments = {
    doctor: 'flu shot',
    vet: 'shots and a chew toy'
};

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

exports.register.attributes = {
    name: 'people'
};

const _mapPatientsToTreatment = function (patients, job) {

    const treatment = treatments[job.toLowerCase()];
    const treatmentsToPatients = [];

    for (let i = 0; i < patients.length; ++i) {
        const patient = patients[i];
        treatmentsToPatients.push({
            patient: patient,
            treatment: treatment
        });
    };

    return treatmentsToPatients;
};
