const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Test DB
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get projects
app.get('/projects', async (req, res) => {
  const result = await pool.query('SELECT * FROM projects');
  res.json(result.rows);
});

// Add project
app.post('/projects', async (req, res) => {
  const { title, description, link } = req.body;

  await pool.query(
    'INSERT INTO projects (title, description, link) VALUES ($1, $2, $3)',
    [title, description, link]
  );

  res.send('Project added');
});

// Contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  await pool.query(
    'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
    [name, email, message]
  );

  res.send('Message saved');
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
