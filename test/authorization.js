const request = require('supertest')('http://localhost');
const expect = require('chai').expect;

testEndpoint('PATCH', '/accounts/42');
testEndpoint('GET', '/accounts/42');
testEndpoint('DELETE', '/accounts/42');

testEndpoint('GET', '/accounts/42/inbox');
testEndpoint('DELETE', '/accounts/42/inbox/42');

testEndpoint('GET', '/accsearch');

testEndpoint('DELETE', '/accounts/logout');

testEndpoint('GET', '/accounts/42/friends');
testEndpoint('DELETE', '/accounts/42/friends/42');

testEndpoint('POST', '/accounts/42/friendrequests/create');
testEndpoint('POST', '/accounts/42/friendrequests/accept');
testEndpoint('POST', '/accounts/42/friendrequests/decline');

testEndpoint('GET', '/accounts/42/battles');
testEndpoint('GET', '/battles/42');
testEndpoint('POST', '/battles/42/turn');

testEndpoint('GET', '/pets/42');
testEndpoint('PATCH', '/pets/42');

testEndpoint('GET', '/accounts/42/inventory');
testEndpoint('POST', '/accounts/42/inventory/42/use');

testEndpoint('GET', '/shop/items');
testEndpoint('POST', '/shop/items/42/buy');

function testEndpoint(method, path)
{
    describe(`${method} ${path}`, function ()
    {
        it('returns unauthorized', async function ()
        {
            switch (method)
            {
                case 'GET': var response = await request.get(path); break;
                case 'POST': var response = await request.post(path); break;
                case 'PATCH': var response = await request.patch(path); break;
                case 'DELETE': var response = await request.delete(path); break;
                default: throw Error('Unknown method');
            }
            expect(response.status).to.eql(401);
        });
    });
}