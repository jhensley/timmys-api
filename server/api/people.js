'use strict';

const treatments = {
    doctor: 'flu shot',
    vet: 'shots and a chew toy'
};

exports.name = 'people';

exports.register = function (server) {

    server.route({
        method: 'POST',
        path: '/people',
        handler: (request) => {

            const payload = request.payload;

            return {
                greeting: 'Hi ' + payload.name + '!',
                patients: _mapPatientsToTreatment(payload.patients, payload.job)
            };

        }
    });

};

const _mapPatientsToTreatment = function (patients, job) {

    return patients.reduce((memo, iter) => {

        memo.push({
            patient: iter,
            treatment: treatments[job.toLowerCase()]
        });

        return memo;
    }, []);

};
