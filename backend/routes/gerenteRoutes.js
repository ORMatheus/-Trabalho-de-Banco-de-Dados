// routes/gerenteRoutes.js
const express = require('express');
const router = express.Router();
const gerenteController = require('../controllers/gerenteController');

router.post('/', gerenteController.createGerente);

module.exports = router;