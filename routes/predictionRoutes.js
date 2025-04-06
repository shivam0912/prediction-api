const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prediction = require('../models/Prediction');
const validator = require('validator');

//post route
router.post('/prediction', async (req, res) => {
    try {
        const { question, category, expiryTime } = req.body;

        
        if (!question || !category || !expiryTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validator.isLength(question, { min: 1, max: 500 })) {
            return res.status(400).json({ error: 'Question must be between 1 and 500 characters' });
        }

        if (!validator.isISO8601(expiryTime)) {
            return res.status(400).json({ error: 'Invalid expiry time format' });
        }

        const prediction = new Prediction({
            question,
            category,
            expiryTime: new Date(expiryTime)
        });

        await prediction.save();

        res.status(201).json({
            predictionId: prediction._id,
            message: 'Prediction created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /predictions
router.get('/predictions', async (req, res) => {
    try {
        const currentTime = new Date();
        const predictions = await Prediction.find({
            expiryTime: { $gt: currentTime }
        }).select('-__v');

        res.json(predictions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/opinion', async (req, res) => {
    try {
        const { predictionId, userId, opinion, amount } = req.body;

        // Input validation
        if (!predictionId || !userId || !opinion || !amount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!mongoose.Types.ObjectId.isValid(predictionId)) {
            return res.status(400).json({ error: 'Invalid prediction ID' });
        }

        if (!['Yes', 'No'].includes(opinion)) {
            return res.status(400).json({ error: 'Opinion must be Yes or No' });
        }

        if (!validator.isNumeric(amount.toString()) || amount <= 0) {
            return res.status(400).json({ error: 'Amount must be a positive number' });
        }

        const prediction = await Prediction.findById(predictionId);
        if (!prediction) {
            return res.status(404).json({ error: 'Prediction not found' });
        }

        if (new Date(prediction.expiryTime) < new Date()) {
            return res.status(400).json({ error: 'Prediction has expired' });
        }

        const newOpinion = new Opinion({
            predictionId,
            userId,
            opinion,
            amount
        });

        await newOpinion.save();

        res.status(201).json({
            message: 'Opinion recorded successfully',
            opinionId: newOpinion._id,
            predictionId,
            userId,
            opinion,
            amount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
module.exports = router;
