const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const Password = require('./models/Password');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/password-manager', { useNewUrlParser: true, useUnifiedTopology: true });

// User registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Save password
app.post('/api/passwords', async (req, res) => {
    const { token, password, fieldName } = req.body;
    const decoded = jwt.verify(token, 'secret');
    const newPassword = new Password({ userId: decoded.id, fieldName, password });
    await newPassword.save();
    res.status(201).send('Password saved');
});

// Get passwords
app.get('/api/passwords', async (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'secret');
    const passwords = await Password.find({ userId: decoded.id });
    res.json(passwords);
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));