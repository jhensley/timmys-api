'use strict';

/**
 * We're using Foobar Currency, where there are 100 Foos to one Bar and
 * the denominations are:
 * 		1  Foo
 *   	5  Foos
 *    10 Foos
 *    20 Foos
 *    50 Foos
 *    1  Bar
 *    2  Bars
 */

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/coins',
        handler: function (request, reply) {

            reply({ coins: {} });

        }
    });

    next();

};

exports.register.attributes = {
    name: 'coins'
};
