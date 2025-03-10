
const userController = require('../src/api/controllers/userController')
const httpMocks = require('node-mocks-http');

describe("Controller Test Suite", () => {
    test("GetAllUsers", async () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse
        res.json = jest.fn()
        res.status = jest.fn().mockReturnValue(res); // Make res.status chainable

        // Call the function
        user_data = await userController.getAllUsers(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200); // Expect a 200 response
        expect(res.json).toHaveBeenCalled(); // Ensure JSON response is sent

        // const user_data = await userController.getAllUsers(req, res)
        console.log("!!! \n", res.json)
        // expect(true.toBe.true)
    });

});