const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user.id,
    });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await property.remove();
    res.status(200).json({ message: 'Property deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};