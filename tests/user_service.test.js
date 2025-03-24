const { Pool } = require('pg');
const userService = require('../src/api/services/userService');

// simulates a fake database by mocking postgres requirement
// and replacing the call to pg.Pool.Query with a mock function
jest.mock('pg', () => {
  const mockQuery = jest.fn()
  return {
    Pool: jest.fn(() => ({
      query: mockQuery,
    }))
  }
})

describe('fetch all users', () => {
  
  // set up testing pool
  let testPool;
  beforeEach(() => {
    testPool = new Pool();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  // success result test
  test('should fetch all users', async () => {
    const mockSuccessResult = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Doe'}];

    // query is SQL, callback is the func called once query complete
    // result is no error (null) & the (faked) result from query
    testPool.query.mockImplementation((query, callback) => callback(null, {rows: mockSuccessResult}))

    const users = await userService.fetchAllUsers();

    expect(users).toEqual(mockSuccessResult);
    expect(testPool.query).toHaveBeenCalledWith('SELECT * FROM users ORDER BY id ASC', expect.any(Function));

  })

  // add failure test

})
