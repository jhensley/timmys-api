'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../config');

const { describe, it } = exports.lab = Lab.script();

describe('Config', () => {

    it('it gets config data', async () => {

        await Code.expect(Config.get('/')).to.be.an.object();

    });

    it('it gets config meta data', async () => {

        await Code.expect(Config.meta('/')).to.match(/This file configures Timmys API/i);

    });

});
