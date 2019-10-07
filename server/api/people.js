'use strict';

exports.name = 'people';

exports.register = function (server) {

    server.route({
        method: 'POST',
        path: '/people/',
        handler: (request) => {

            return {};

        }
    });

};
