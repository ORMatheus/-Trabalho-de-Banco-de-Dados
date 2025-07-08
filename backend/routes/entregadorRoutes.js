// routes/entregadorRoutes.js
const express = require('express');
const router = express.Router();
const entregadorController = require('../controllers/entregadorController');

router.post('/', entregadorController.createEntregador);

module.exports = router;