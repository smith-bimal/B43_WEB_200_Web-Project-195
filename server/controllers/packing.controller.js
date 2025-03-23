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

        // Fetch and update itinerary
        const itinerary = await Itinerary.findById(req.body.itinerary);
        if (!itinerary) {
            await Packing.findByIdAndDelete(savedItem._id);
            return res.status(404).json({ message: 'Itinerary not found' });
        }

        itinerary.packings = [...itinerary.packings, savedItem._id];
        await itinerary.save();

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
        const item = await Packing.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Fetch and update itinerary
        const itinerary = await Itinerary.findById(item.itinerary);
        if (itinerary) {
            itinerary.packings = itinerary.packings.filter(
                id => id.toString() !== item._id.toString()
            );
            await itinerary.save();
        }

        await Packing.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
