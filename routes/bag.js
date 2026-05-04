const express = require('express');
const router = express.Router();
const Bag = require('../models/Bag');

// CREATE
router.post('/', async (req, res) => {
  try {
    const bag = new Bag(req.body);
    await bag.save();
    res.json(bag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/', async (req, res) => {
  const bags = await Bag.find();
  res.json(bags);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bag);
});

// DELETE BY GATE
router.delete('/gate/:gate', async (req, res) => {
  await Bag.deleteMany({ deliverGate: req.params.gate });
  res.json({ msg: "Deleted bags at gate " + req.params.gate });
});

module.exports = router;