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
  const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this ticket?")) {
        try {
          // Calling our new delete route
          const response = await fetch(`http://localhost:5001/api/tickets/${id}`, {
            method: 'DELETE', 
          });

          if (response.ok) {
            fetchTickets(); // This refreshes the list so the ticket disappears!
          }
        } catch (err) {
          console.error("Failed to delete:", err);
        }
      }
  };
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
              <th style={{ padding: '12px' }}>Actions</th> {/* New Header */}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '12px' }}>{ticket.subject}</td>
                <td style={{ padding: '12px' }}>{ticket.priority}</td>
                <td style={{ padding: '12px' }}>{ticket.status}</td>
                <td style={{ padding: '12px' }}>{new Date(ticket.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => handleDelete(ticket.id)}
                    style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketList;