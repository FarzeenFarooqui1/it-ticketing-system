import { useEffect, useState } from 'react';
import CreateTicket from './CreateTicket'; // Import the new form

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    fetch('http://localhost:5001/api/tickets')
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error('Error fetching tickets:', err));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <CreateTicket onTicketCreated={fetchTickets} /> {/* Add the form here */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>IT Support Dashboard</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          backgroundColor: '#242424', // Darker tile color
          color: '#ffffff',           // Force white text
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#333', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Subject</th>
              <th style={{ padding: '12px' }}>Priority</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '12px' }}>{ticket.subject}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    backgroundColor: ticket.priority === 'HIGH' ? '#ff4d4d' : '#4d94ff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {ticket.priority}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{ticket.status}</td>
                <td style={{ padding: '12px' }}>{new Date(ticket.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;