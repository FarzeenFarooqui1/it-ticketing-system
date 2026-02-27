const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// 1. HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running and healthy' });
});

// 2. GET ALL TICKETS (The "Read" in CRUD)
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// 3. CREATE A TICKET (The "Create" in CRUD)
// This was missing from your code!
app.post('/api/tickets', async (req, res) => {
  const { subject, description, priority, reporter_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tickets (subject, description, priority, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [subject, description, priority, reporter_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Post Error:', err.message);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// 4. DELETE A TICKET (The "Delete" in CRUD)
// Change this to app.delete to match your React fetch method
app.delete('/api/tickets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM tickets WHERE id = $1', [id]);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});