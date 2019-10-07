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
exports.name = 'coins';

exports.register = function (server) {

    server.route({
        method: 'GET',
        path: '/coins',
        handler: function (request) {

            return {};

        }
    });

};
