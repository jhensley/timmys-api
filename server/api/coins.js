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

var foos = [1, 5, 10, 20, 50],
    bars = [1, 2];

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/coins',
        handler: function (request, reply) {
            var total = parseFloat(request.query.total),
                queryFoos = request.query.total.split(".")[1],
                queryBars = parseInt(total);

            // Return the JSON object
            reply({
                total: total,
                coins: {
                    foos: _getCurrency(queryFoos, foos),
                    bars: _getCurrency(queryBars, bars)
                }
            });

        }
    });

    next();

};

function _getCurrency(value, bits) {
    var bit,
        split = {},
        i = 0,
        sorted = bits.sort(function(a, b) {
            return a < b
        });
    while (bit = bits[i++]) {
        split[bit] = 0;
        if (value >= bit) {
            split[bit] = ~~(value/bit);
            value %= bit;
        }
    }
    return split;
}

exports.register.attributes = {
    name: 'coins'
};
