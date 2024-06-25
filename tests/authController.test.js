const authController = require('../controllers/authController');
const db = require('../models/db');

jest.mock('../models/db');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
  });

  describe('Login', () => {
    test('should login user and redirect to /parking', () => {
      const req = {
        body: { username: 'testuser', password: 'testpass' },
        session: {}
      };
      const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

      const mockUser = { id: 1, username: 'testuser', password: 'testpass' };
      db.query.mockImplementation((query, values, callback) => {
        callback(null, [mockUser]);
      });

      authController.login(req, res);

      expect(req.session.user).toEqual(mockUser);
      expect(res.redirect).toHaveBeenCalledWith('/parking');
    });

    test('should fail login with invalid credentials and return 401', () => {
      const req = {
        body: { username: 'wronguser', password: 'wrongpass' },
        session: {}
      };
      const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

      db.query.mockImplementation((query, values, callback) => {
        callback(null, []);
      });

      authController.login(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/login?msg=invalid_credentials');
    });

    test('should handle missing username or password', () => {
      const req = {
        body: {},
        session: {}
      };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Username and password are required');
    });
  });

});
