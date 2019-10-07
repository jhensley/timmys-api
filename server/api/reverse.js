'use strict';

exports.name = 'reverse';

exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/reverse',
        handler: (request) => {

            return {
                reversed: _reverseInput(request.query.input)
            };

        }
    });

};

const _reverseInput = function (input) {

    let reversed = input.split('').reverse().join('');
    // Check if the input is a string
    if (!isNaN(input)) {
        reversed = parseFloat(reversed);
    }

    return reversed;
};
