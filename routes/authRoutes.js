const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
  }
});
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
