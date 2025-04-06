const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
    predictionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prediction',
        required: true
    },
    userId: {
        type: String,  
        required: true
    },
    opinion: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Opinion', opinionSchema);