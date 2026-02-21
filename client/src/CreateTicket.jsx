import { useState } from 'react';

const CreateTicket = ({ onTicketCreated }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting ticket..."); // Debug log 1

  const newTicket = {
    subject,
    description,
    priority,
    reporter_id: 'a4acd56d-8f84-45bd-b6de-2195356ce845' 
  };

  try {
    const response = await fetch('http://localhost:5001/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    });

    if (response.ok) {
      console.log("Ticket created successfully!"); // Debug log 2
      setSubject('');
      setDescription('');
      onTicketCreated(); // This triggers the fetch in the parent
    } else {
      const errorData = await response.json();
      console.error("Server refused ticket:", errorData);
    }
  } catch (err) {
    console.error('Network Error:', err);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#242424', borderRadius: '8px', color: 'white' }}>
      <h3>Create New Ticket</h3>
      <input 
        type="text" placeholder="Subject" value={subject} 
        onChange={(e) => setSubject(e.target.value)} required
        style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#333', color: 'white', border: '1px solid #444' }}
      />
      <textarea 
        placeholder="Description" value={description} 
        onChange={(e) => setDescription(e.target.value)} required
        style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#333', color: 'white', border: '1px solid #444' }}
      />
      <select 
        value={priority} onChange={(e) => setPriority(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#333', color: 'white' }}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="submit" style={{ display: 'block', padding: '10px 20px', backgroundColor: '#4d94ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit Ticket
      </button>
    </form>
  );
};

export default CreateTicket;