const Packing = require('../models/Packing.model');
const Itinerary = require('../models/Itinerary.model');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Packing.find({ itinerary: req.params.itineraryId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const newItem = new Packing(req.body);
        const savedItem = await newItem.save();

        // Add packing item reference to itinerary
        await Itinerary.findByIdAndUpdate(
            req.body.itinerary,
            { $push: { packings: savedItem._id } }
        );

        res.status(201).json(savedItem);
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
