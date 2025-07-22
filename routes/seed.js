const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

// GET /seed/users
router.get('/users', seedController.seedUsers);

module.exports = router;
