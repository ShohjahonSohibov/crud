import { expect, request } from './setup.js';

describe('Product Routes', () => {
    let token;
    let productId;

    before(async () => {
        // Login to get a token
        const res = await request.post('/api/auth/login')
            .send({ username: 'string', password: 'string' });

        token = res.body.token;

        // Create a product to use for update and delete tests
        const productRes = await request.post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'ProductForTesting', price: 50, description: 'Description' });

        productId = productRes.body.id; // Save the ID for later tests
    });

    it('should get all products', async () => {
        const res = await request.get('/api/products')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('items').that.is.an('array');
    });

    it('should create a new product', async () => {
        const res = await request.post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Product1', price: 100, description: 'Description' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', 'Product1');
    });

    it('should update a product', async () => {
        const updatedProduct = { name: 'UpdatedProduct', price: 150, description: 'Updated Description' };

        const res = await request.put(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProduct);

        expect(res.status).to.equal(200);
        expect(res.body).to.include(updatedProduct);
    });

    it('should delete a product', async () => {
        const res = await request.delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(204); // No content
    });

    it('should verify product is deleted', async () => {
        const res = await request.get(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Product not found');
    });
});
