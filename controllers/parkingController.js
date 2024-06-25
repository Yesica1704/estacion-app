const db = require('../models/db');

exports.addParkingSpace = (req, res) => {
  const { vehicle_type, location, license_plate } = req.body;
  if (!vehicle_type || !location || !license_plate) {
    return res.status(400).send('Vehicle type and location are required');
  }

  // Check limit for the vehicle type
  const checkLimitQuery = 'SELECT COUNT(*) AS count FROM parking_spaces WHERE vehicle_type = ?';
  const limitQuery = 'SELECT max_spaces FROM limits WHERE vehicle_type = ?';

  db.query(limitQuery, [vehicle_type], (err, limitResult) => {
    if (err) throw err;
    const maxSpaces = limitResult[0].max_spaces;

    db.query(checkLimitQuery, [vehicle_type], (err, result) => {
      if (err) throw err;
      const currentCount = result[0].count;

      if (currentCount >= maxSpaces) {
        return res.status(400).send(`Limit reached for ${vehicle_type} spaces`);
      }

      const query = 'INSERT INTO parking_spaces (vehicle_type, location, license_plate, status) VALUES (?, ?, ?, "occupied")';
      db.query(query, [vehicle_type, location, license_plate], (err, result) => {
        if (err) throw err;
        res.redirect('/parking');
      });
    });
  });
};

exports.getParkingSpaces = (req, res) => {
  const query = 'SELECT * FROM parking_spaces';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.updateParkingSpace = (req, res) => {
  const { id, vehicle_type, location, status, license_plate, entry_time, exit_time } = req.body;
  if (!id || !vehicle_type || !location || !status) {
    return res.status(400).send('ID, vehicle type, location, and status are required');
  }

  const query = 'UPDATE parking_spaces SET vehicle_type = ?, location = ?, status = ?, license_plate = ?, entry_time = ?, exit_time = ? WHERE id = ?';
  db.query(query, [vehicle_type, location, status, license_plate, entry_time, exit_time, id], (err, result) => {
    if (err) throw err;
    res.redirect('/spaces');
  });
};

exports.deleteParkingSpace = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send('ID is required');
  }

  const query = 'DELETE FROM parking_spaces WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/spaces');
  });
};

// Función para obtener límites y comparar con espacios ocupados y disponibles
exports.getParkingStatus = (req, res) => {
  const limitsQuery = 'SELECT * FROM limits';
  const spacesQuery = 'SELECT vehicle_type, status, COUNT(*) as count FROM parking_spaces GROUP BY vehicle_type, status';

  db.query(limitsQuery, (err, limitsResult) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los límites de estacionamiento');
      return;
    }

    db.query(spacesQuery, (err, spacesResult) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener los espacios de estacionamiento');
        return;
      }

      const status = { car: { limit: 0, occupied: 0, available: 0 }, motorcycle: { limit: 0, occupied: 0, available: 0 } };

      limitsResult.forEach(limit => {
        if (limit.vehicle_type === 'car') {
          status.car.limit = limit.max_spaces;
        } else if (limit.vehicle_type === 'motorcycle') {
          status.motorcycle.limit = limit.max_spaces;
        }
      });

      spacesResult.forEach(space => {
        if (space.vehicle_type === 'car') {
          if (space.status === 'occupied') {
            status.car.occupied = space.count;
          } else {
            status.car.available += space.count;
          }
        } else if (space.vehicle_type === 'motorcycle') {
          if (space.status === 'occupied') {
            status.motorcycle.occupied = space.count;
          } else {
            status.motorcycle.available += space.count;
          }
        }
      });

      status.car.available = status.car.limit - status.car.occupied;
      status.motorcycle.available = status.motorcycle.limit - status.motorcycle.occupied;

      res.json(status);
    });
  });
};
