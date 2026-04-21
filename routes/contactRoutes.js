const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/contact
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function (err) {
        if (err) {
            console.error('Error inserting contact message:', err.message);
            return res.status(500).json({ success: false, message: 'Server error. Could not send message.' });
        }
        res.status(201).json({ success: true, message: 'Message sent successfully.', id: this.lastID });
    });
});

module.exports = router;
