'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const ReversePlugin = require('../../../server/api/reverse');

const { beforeEach, describe, it } = exports.lab = Lab.script();
let server;

beforeEach(async () => {

    const plugins = [ReversePlugin];
    server = new Hapi.Server();
    server.port = Config.get('/port/api');
    await server.register(plugins);

});

describe('Reverse Plugin', () => {

    it('it returns simple ASCII strings reverse', async () => {

        const response = await server.inject({
            method: 'GET',
            url: '/reverse?input=foobar'
        });

        Code.expect(response.result.reversed).to.match(/raboof/i);
        Code.expect(response.statusCode).to.equal(200);

    });

    it('it returns reversed two-byte UTF-8 strings', async () => {

        const response = await server.inject({
            method: 'GET',
            url: '/reverse?input=éöÿ'
        });

        Code.expect(response.result.reversed).to.match(/ÿöé/i);
        Code.expect(response.statusCode).to.equal(200);

    });

    it('it returns reversed integers', async () => {

        const response = server.inject({
            method: 'GET',
            url: '/reverse?input=309834'
        });

        Code.expect(response.result.reversed).to.equal(438903);
        Code.expect(response.result.reversed).to.be.a.number();
        Code.expect(response.statusCode).to.equal(200);

    });

    it('it returns reversed floats', async () => {

        const response = await server.inject({
            method: 'GET',
            url: '/reverse?input=34.09'
        });

        Code.expect(response.result.reversed).to.equal(90.43);
        Code.expect(response.result.reversed).to.be.a.number();
        Code.expect(response.statusCode).to.equal(200);

    });

});
