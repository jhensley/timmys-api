'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/reverse',
        handler: function (request, reply) {

            reply({
                reversed: _reverseInput(request.query.input)
            });

        }
    });

    next();

};

exports.register.attributes = {
    name: 'reverse'
};

const _reverseInput = function (input) {

    let reversed = input.split('').reverse().join('');
    // Check if the input is a string
    if (!isNaN(input)) {
        reversed = parseFloat(reversed);
    };
    return reversed;
};
