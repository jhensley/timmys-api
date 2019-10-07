'use strict';

const Lab = require('lab');
const Code = require('code');
const Manifest = require('../manifest');

const { describe, it } = exports.lab = Lab.script();

describe('Manifest', () => {

    it('it gets manifest data', async () => {

        await Code.expect(Manifest.get('/')).to.be.an.object();

    });

    it('it gets manifest meta data', async () => {

        await Code.expect(Manifest.meta('/')).to.match(/This file defines Timmys API/i);

    });

});
