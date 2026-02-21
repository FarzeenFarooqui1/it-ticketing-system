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

// Make sure it is app.get (not app.post) and has the /api/ prefix
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

const PORT = 5001;
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