const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/cloudtask';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('Connection Error:', err));

// Routes Middleware
app.use('/api/tasks', taskRoutes);

app.get("/health", (req, res) => {
    res.status(200).send("OK");
})

app.get("/ready", (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).send("Ready");
    } else {
        res.status(500).send("NOT READY");
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  