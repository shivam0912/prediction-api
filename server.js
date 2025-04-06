const express = require('express');
const connectDB = require('./config/db');
const predictionRoutes = require('./routes/predictionRoutes');
require('dotenv').config();

const app = express();


connectDB();

app.use(express.json());
app.use('/api', predictionRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
