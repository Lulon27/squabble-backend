const request = require('supertest')(process.env.TEST_SERVER_HOST);
const expect = require('chai').expect;
const database = require('../database');

describe(`Test account update`, function ()
{
    it('should update the account and then get the updated data back', async function ()
    {
        await database.doQuery('CALL PrepareTestEnv();');

        response = await request.post('/accounts/login?username=Testuser2&password=TestPW2');
        expect(response.status).to.eql(200);

        const sessionID = response.headers['set-cookie'][0].split(';')[0];
        response = await request.patch('/accounts/Testuser2').set('Cookie', sessionID).send({username: 'Testuser2NewName', petName: 'PETTY'});
        expect(response.status).to.eql(200);

        response = await request.patch('/accounts/Testuser2NewName').set('Cookie', sessionID).send({username: 'Testuser2'});
        expect(response.status).to.eql(200);

        response = await request.patch('/accounts/Testuser2').set('Cookie', sessionID).send({username: null});
        expect(response.status).to.eql(422);

        response = await request.patch('/accounts/Testuser2').set('Cookie', sessionID).send({username: 'T'});
        expect(response.status).to.eql(422);
    });
});
