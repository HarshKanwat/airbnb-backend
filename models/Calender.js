const mongoose = require('mongoose');
const { Schema } = mongoose;

const calendarSchema = new Schema({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    date: { type: Date, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Calendar', calendarSchema);
