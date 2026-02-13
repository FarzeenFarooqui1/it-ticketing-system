const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Test route to ensure server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running and healthy' });
});

// Route to create a new ticket
app.post('/api/tickets', async (req, res) => {
  const { subject, description, priority, reporter_id } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO tickets (subject, description, priority, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [subject, description, priority || 'LOW', reporter_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Get all tickets from the database
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});