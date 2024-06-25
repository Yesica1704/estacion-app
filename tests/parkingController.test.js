const parkingController = require('../controllers/parkingController');
const db = require('../models/db');

jest.mock('../models/db');

describe('Parking Controller', () => {
  test('should add parking space within limit', () => {
    const req = { body: { vehicle_type: 'car', location: 'A1', license_plate: 'QWE123' } };
    const res = { redirect: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

    db.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{ max_spaces: 10 }]);
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{ count: 5 }]);
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, { insertId: 1 });
      });

    parkingController.addParkingSpace(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/parking');
  });

  test('should not add parking space if limit reached', () => {
    const req = { body: { vehicle_type: 'car', location: 'A1', license_plate: 'QWE123' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    db.query
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{ max_spaces: 10 }]);
      })
      .mockImplementationOnce((query, values, callback) => {
        callback(null, [{ count: 10 }]);
      });

    parkingController.addParkingSpace(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Limit reached for car spaces');
  });

  // Tests for getParkingSpaces, updateParkingSpace, and deleteParkingSpace can be added similarly
});
