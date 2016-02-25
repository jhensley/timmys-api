'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const CoinsPlugin = require('../../../server/api/reverse');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {

    const plugins = [CoinsPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();

    });

});

lab.experiment('Coins Plugin', () => {

    lab.test('it returns an object with total and coins properties', (done) => {

        server.inject({
            method: 'GET',
            url: '/coins?total=22.20'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.total).to.equal(22.20);
            Code.expect(response.result.total).to.be.a.number();
            Code.expect(response.result.coins).to.be.an.object();
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns the correct schema for the coins property', (done) => {

        server.inject({
            method: 'GET',
            url: '/coins?total=22.20'
        }, (response) => {

            Code.expect(Object.keys(response.result.coins)).to.have.length(2);
            Code.expect(response.result.coins.foos).to.be.an.object();
            Code.expect(Object.keys(response.result.coins.bars)).to.only.include(['1', '2']);
            Code.expect(response.result.coins.bars).to.be.an.object();
            Code.expect(Object.keys(response.result.coins.foos)).to.only.include(['1', '5', '10', '20', '50']);
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns the minimum number of coins for a total', (done) => {

        server.inject({
            method: 'GET',
            url: '/coins?total=22.20'
        }, (response) => {

            Code.expect(response.result.coins.bars).to.be.an.object();
            Code.expect(response.result.coins.foos).to.be.an.object();

            // Check correct values are present
            Code.expect(response.result.coins.bars['2']).to.equal(11);
            Code.expect(response.result.coins.foos['20']).to.equal(1);
            // Check 0 values are returned for unused denominations
            Code.expect(response.result.coins.bars['1']).to.equal(0);
            Code.expect(response.result.coins.foos['1']).to.equal(0);
            Code.expect(response.result.coins.foos['5']).to.equal(0);
            Code.expect(response.result.coins.foos['10']).to.equal(0);
            Code.expect(response.result.coins.foos['50']).to.equal(0);

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

});
