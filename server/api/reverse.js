'use strict';

exports.name = 'reverse';

exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/reverse',
        handler: function (request) {

            return {};

        }
    });

};
