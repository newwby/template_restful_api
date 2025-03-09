const request = require('supertest');
const app = require('../index');

describe("FetchUser test suite", () => {

    test("FetchAllUsers", async () => {
        const response = await request(app).get('/users');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
