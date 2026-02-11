const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 5001; // Use 5001 to avoid conflict with Vite

app.use(cors());
app.use(express.json());

// API Route to create a new ticket
app.post('/api/tickets', async (req, res) => {
  const { subject, description, priority, reporter_id } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO tickets (subject, description, priority, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [subject, description, priority || 'LOW', reporter_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
