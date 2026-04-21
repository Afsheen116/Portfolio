const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/projects
router.get('/', (req, res) => {
    db.all(`SELECT * FROM projects`, [], (err, rows) => {
        if (err) {
            console.error('Error fetching projects:', err.message);
            return res.status(500).json({ success: false, message: 'Server error. Could not fetch projects.' });
        }
        
        // Parse techStack string back to array because frontend expects an array or handles comma separated
        const projects = rows.map(row => {
            return {
                ...row,
                techStack: row.techStack ? row.techStack.split(',').map(t => t.trim()) : []
            };
        });

        res.status(200).json({ success: true, data: projects });
    });
});

// POST /api/projects
router.post('/', (req, res) => {
    const { title, description, techStack, liveLink, githubLink, image } = req.body;

    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    // Convert array to string if its an array
    const stackStr = Array.isArray(techStack) ? techStack.join(', ') : techStack || '';

    const query = `INSERT INTO projects (title, description, techStack, liveLink, githubLink, image) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [title, description, stackStr, liveLink || '', githubLink || '', image || ''], function (err) {
        if (err) {
            console.error('Error adding project:', err.message);
            return res.status(500).json({ success: false, message: 'Server error. Could not add project.' });
        }
        res.status(201).json({ success: true, message: 'Project added successfully.', id: this.lastID });
    });
});

module.exports = router;
