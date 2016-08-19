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

const foos = [1, 5, 10, 20, 50];
const bars = [1, 2];

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/coins',
        handler: function (request, reply) {

            const total = parseFloat(request.query.total);
            const queryFoos = request.query.total.split('.')[1];
            const queryBars = parseInt(total);

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

exports.register.attributes = {
    name: 'coins'
};

const _getCurrency = function (value, bits) {

    const sorted = bits.sort((a, b) => {

        return a < b;
    });
    const split = {};

    let bit;
    let i = 0;

    while (bit = sorted[i++]) {
        split[bit] = 0;
        if (value >= bit) {
            split[bit] = ~~(value / bit);
            value %= bit;
        }
    }
    return split;
};
