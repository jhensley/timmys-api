'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const PeoplePlugin = require('../../../server/api/people');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {

    const plugins = [PeoplePlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();

    });

});

lab.experiment('People Plugin', () => {

    lab.test('it should greet Sally', (done) => {

        server.inject({
            method: 'POST',
            url: '/people',
            payload: {
                job: 'doctor',
                name: 'Sally',
                patients: ['Bob', 'Mohammed', 'Claire']
            }
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.greeting).to.be.a.string();
            Code.expect(response.result.greeting).to.equal('Hi Sally!');
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it should suggest treatments for Sally\'s paitents', (done) => {

        server.inject({
            method: 'POST',
            url: '/people',
            payload: {
                job: 'doctor',
                name: 'Sally',
                patients: ['Bob', 'Mohammed', 'Claire']
            }
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.patients).to.be.an.array();

            Code.expect(response.result.patients[0].patient).to.equal('Bob');
            Code.expect(response.result.patients[0].treatment).to.equal('flu shot');

            Code.expect(response.result.patients[1].patient).to.equal('Mohammed');
            Code.expect(response.result.patients[1].treatment).to.equal('flu shot');

            Code.expect(response.result.patients[2].patient).to.equal('Claire');
            Code.expect(response.result.patients[2].treatment).to.equal('flu shot');

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it should suggest different treatments for a vet', (done) => {

        server.inject({
            method: 'POST',
            url: '/people',
            payload: {
                job: 'Vet',
                name: 'Steve',
                patients: ['Pickles', 'Mr Bojangles']
            }
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.patients).to.be.an.array();

            Code.expect(response.result.patients[0].patient).to.equal('Pickles');
            Code.expect(response.result.patients[0].treatment).to.equal('shots and a chew toy');

            Code.expect(response.result.patients[1].patient).to.equal('Mr Bojangles');
            Code.expect(response.result.patients[1].treatment).to.equal('shots and a chew toy');

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

});
