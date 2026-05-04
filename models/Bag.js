const express = require('express');
const router = express.Router();
const bagController = require('../controllers/bagController');
const authJwtController = require('../auth_jwt');

// CREATE
router.post('/', authJwtController.isAuthenticated, bagController.createBag);

// READ ALL
router.get('/', authJwtController.isAuthenticated, bagController.getBags);

// READ ONE (ADD THIS)
router.get('/:id', authJwtController.isAuthenticated, bagController.getBagById);

// UPDATE
router.put('/:id', authJwtController.isAuthenticated, bagController.updateBag);

// DELETE BY GATE
router.delete('/gate/:gate', authJwtController.isAuthenticated, bagController.deleteByGate);

module.exports = router;