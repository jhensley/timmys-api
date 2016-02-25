'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/people/',
        handler: function (request, reply) {

            reply({});

        }
    });

    next();

};

exports.register.attributes = {
    name: 'people'
};
