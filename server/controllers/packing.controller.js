const Packing = require('../models/Packing.model');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Packing.find({ itinerary: req.params.itineraryId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const newItem = new Packing(req.body);
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Packing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await Packing.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
