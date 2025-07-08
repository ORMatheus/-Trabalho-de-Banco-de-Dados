// routes/seederRoutes.js
const express = require('express');
const router = express.Router();
const seederController = require('../controllers/seederController');

router.post('/clientes/seed', seederController.seedCliente);
router.post('/produtos/seed', seederController.seedProduto);
router.post('/adms/seed', seederController.seedAdm);
router.post('/gerentes/seed', seederController.seedGerente);
router.post('/entregadores/seed', seederController.seedEntregador);

module.exports = router;
