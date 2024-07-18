import { expect, request } from './setup.js';

describe('Auth Routes', () => {
    let token;

    before(async () => {
        // Login to get a token
        const res = await request.post('/api/auth/login')
            .send({ username: 'string', password: 'string' });

        token = res.body.token;
    });

    it('should login and return a token', () => {
        expect(token).to.be.a('string');
    });
});
