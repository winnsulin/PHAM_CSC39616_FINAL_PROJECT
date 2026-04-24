const Bag = require('../models/Bag');

// CREATE
exports.createBag = async (req, res) => {
  try {
    const bag = new Bag(req.body);
    await bag.save();
    res.status(201).json(bag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL (sorted by urgency)
exports.getBags = async (req, res) => {
  try {
    const bags = await Bag.find({ status: 'pending' })
      .sort({ departureTime: 1 });

    res.json(bags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (mark delivered)
exports.updateBag = async (req, res) => {
  try {
    const bag = await Bag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(bag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE by Gate
exports.deleteByGate = async (req, res) => {
  try {
    await Bag.deleteMany({ deliverGate: req.params.gate });
    res.json({ message: 'Bags dropped off at ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};