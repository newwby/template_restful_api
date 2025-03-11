const userService = require('../src/api/services/userService');
const userController = require('../src/api/controllers/userController');
const httpMocks = require('node-mocks-http');

// for testing 
jest.mock('../src/api/services/userService');

// tests that don't require userService to be mocked
describe("Controller Unit Test Suite", () => {

    test("GetAllUsers", async () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse
        res.json = jest.fn()
        res.status = jest.fn().mockReturnValue(res);

        user_data = await userController.getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});


// unit tests with userService mocked
describe('getUserById Tests', () => {

    // each test uses the same components
    let req, res;
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
    });

    // success test
    test('should return user data when user exists', async () => {
        const mockUser = { id: 1, name: 'John Doe' };
        userService.fetchUser.mockResolvedValue(mockUser);
        req.id = 1;
        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: mockUser });
    });

    // need integration test with middleware checking for user id (need to test 404 response)
    // error test
    test('should return 500 if userService throws an error', async () => {
        userService.fetchUser.mockRejectedValue(new Error('Database connection failed'));
        req.id = 1;
        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database connection failed',
            status: 500
        });
    });
});
