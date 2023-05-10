const express = require('express');
const router = express.Router();
const controller = require('../controllers/sneaker.js');

//Define routes
router.get('/sneakers', controller.getSneakers);
router.get('/sneakers/:id', controller.getSneaker);

module.exports = router;