const express = require('express');
const router = express.Router();

const bagController = require('../controllers/bagController');
const authJwtController = require('../auth_jwt');

// =======================
// CREATE BAG
// =======================
router.post(
  '/',
  authJwtController.isAuthenticated,
  bagController.createBag
);

// =======================
// GET ALL BAGS
// =======================
router.get(
  '/',
  authJwtController.isAuthenticated,
  bagController.getBags
);

// =======================
// UPDATE BAG BY ID
// =======================
router.put(
  '/:id',
  authJwtController.isAuthenticated,
  bagController.updateBag
);

// =======================
// DELETE BAG BY ID (DROP OFF)
// =======================
router.delete(
  '/:id',
  authJwtController.isAuthenticated,
  bagController.deleteBagById
);

module.exports = router;