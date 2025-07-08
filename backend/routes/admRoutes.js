// routes/admRoutes.js
const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');

// CREATE
router.post('/', admController.createAdm);

// READ (Todos)
router.get('/', admController.getAllAdms);

// READ (Por ID) 
router.get('/:id', admController.getAdmById);

// UPDATE
router.put('/:id', admController.updateAdm);

// DELETE
router.delete('/:id', admController.deleteAdm);

module.exports = router;