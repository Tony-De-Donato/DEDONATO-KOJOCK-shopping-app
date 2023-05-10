const express = require('express');
const router = express.Router();
const controller = require('../controllers/kit.js');

//Define routes
router.get('/kit', controller.getKits);
router.get('/kits/:id', controller.getKit);

module.exports = router;