'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const ReversePlugin = require('../../../server/api/reverse');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {

    const plugins = [ReversePlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();

    });

});

lab.experiment('Reverse Plugin', () => {

    lab.test('it returns simple ASCII strings reverse', (done) => {

        server.inject({
            method: 'GET',
            url: '/reverse?input=foobar'
        }, (response) => {

            Code.expect(response.result.reversed).to.match(/raboof/i);
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns reversed two-byte UTF-8 strings', (done) => {

        server.inject({
            method: 'GET',
            url: '/reverse?input=éöÿ'
        }, (response) => {

            Code.expect(response.result.reversed).to.match(/ÿöé/i);
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns reversed integers', (done) => {

        server.inject({
            method: 'GET',
            url: '/reverse?input=309834'
        }, (response) => {

            Code.expect(response.result.reversed).to.equal(438903);
            Code.expect(response.result.reversed).to.be.a.number();
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns reversed floats', (done) => {

        server.inject({
            method: 'GET',
            url: '/reverse?input=34.09'
        }, (response) => {

            Code.expect(response.result.reversed).to.equal(90.43);
            Code.expect(response.result.reversed).to.be.a.number();
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

});
