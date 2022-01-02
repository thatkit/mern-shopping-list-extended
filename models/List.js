const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // user_id, // wtf
    // items, // wtf
    total_budget: {
        type: Number,
        required: true
    },
    total_costs: {
        type: Number,
        default: 0
    },
    remainder: {
        type: Number,
        default: this.total_budget - this.total_costs
    }
});

module.exports = List = mongoose.model('list', ListSchema);