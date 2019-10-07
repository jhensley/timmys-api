'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');

const composeOptions = {
    relativeTo: __dirname
};

module.exports = async function () {
    try {
        const server = await Glue.compose(Manifest.get('/'), composeOptions);
        await server.start();

        console.log('Started the Timmy\'s API on port ' + server.info.port);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
