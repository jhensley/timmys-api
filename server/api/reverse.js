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

function _reverseInput(input) {
    var reversed = input.split('').reverse().join('');
    // Check if the input is a string
    if (!isNaN(input)) {
        reversed = parseFloat(reversed);
    } 
    return reversed
}

exports.register.attributes = {
    name: 'reverse'
};
