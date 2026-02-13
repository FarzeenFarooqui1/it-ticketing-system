import { useEffect, useState } from 'react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/tickets')
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error('Error fetching tickets:', err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>IT Support Dashboard</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.subject}</td>
              <td><strong>{ticket.priority}</strong></td>
              <td>{ticket.status}</td>
              <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;