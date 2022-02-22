const request = require('supertest')('http://localhost:3001');
const expect = require('chai').expect;
const database = require('../database');

describe(`Test account system`, function ()
{
    it('should register the user, login and logout successfully', async function ()
    {
        await database.doQuery('CALL PrepareTestEnv();');

        let response = await request.post('/accounts').send(
        {
            email: 'new.test.user@test.org',
            username: 'NewTestuser',
            password: 'TestPW',
            petName: 'NewTestPet',
            petKind: 'FOX',
            pictureId: 0,
        });
        expect(response.status).to.eql(201);

        response = await request.post('/accounts/login?username=NewTestuser&password=TestPW');
        expect(response.status).to.eql(200);

        const sessionID = response.headers['set-cookie'][0].split(';')[0];
        response = await request.get('/accounts/NewTestuser').set('Cookie', sessionID);
        expect(response.status).to.eql(200);

        response = await request.delete('/accounts/logout').set('Cookie', sessionID);
        expect(response.status).to.eql(200);

        response = await request.get('/accounts/NewTestuser').set('Cookie', sessionID);
        expect(response.status).to.eql(401);
    });
});
