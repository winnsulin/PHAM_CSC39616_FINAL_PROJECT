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

exports.deleteBagById = async (req, res) => {
  try {
    const deleted = await Bag.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Bag not found" });
    }

    res.json({
      message: `Bag ${req.params.id} deleted successfully`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};