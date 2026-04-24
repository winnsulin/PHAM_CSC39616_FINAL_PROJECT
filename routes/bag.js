// bag routes
const express = require('express');
const router = express.Router();
const bagController = require('../controllers/bagController');
const authJwtController = require('../auth_jwt');

// CRUD Routes
router.post('/', authJwtController.isAuthenticated, bagController.createBag);
router.get('/', authJwtController.isAuthenticated, bagController.getBags);
router.put('/:id', authJwtController.isAuthenticated, bagController.updateBag);
router.delete('/gate/:gate', authJwtController.isAuthenticated, bagController.deleteByGate);

module.exports = router;