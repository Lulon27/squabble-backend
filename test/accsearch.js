const request = require('supertest')(process.env.TEST_SERVER_HOST);
const expect = require('chai').expect;
const database = require('../database');

describe(`Test account search`, function ()
{
    it('should find 3 users', async function ()
    {
        await database.doQuery('CALL PrepareTestEnv();');

        response = await request.post('/accounts/login?username=Testuser1&password=TestPW1');
        expect(response.status).to.eql(200);

        const sessionID = response.headers['set-cookie'][0].split(';')[0];
        response = await request.get('/accsearch?filter=user').set('Cookie', sessionID);
        expect(response.status).to.eql(200);
        expect(response.body.content.length).to.eql(3);
    });
    
    it('should find 1 user', async function ()
    {
        await database.doQuery('CALL PrepareTestEnv();');

        response = await request.post('/accounts/login?username=Testuser1&password=TestPW1');
        expect(response.status).to.eql(200);

        const sessionID = response.headers['set-cookie'][0].split(';')[0];
        response = await request.get('/accsearch?filter=user1').set('Cookie', sessionID);
        expect(response.status).to.eql(200);
        expect(response.body.content.length).to.eql(1);
    });
});
