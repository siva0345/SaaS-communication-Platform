import React, { useEffect, useState } from "react";
import axios from 'axios';
import './CommunicationDetails.css';

function CommunicationDetails({ user }) {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', body: '' });

  useEffect(() => {
    axios.get('/api/emails', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(response => setEmails(response.data))
    .catch(error => console.error('Error fetching emails:', error));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmail({ ...newEmail, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending email:', newEmail);
    axios.post('/api/send-email', newEmail)
      .then(response => {
        console.log('Email sent:', response.data);
        setNewEmail({ to: '', subject: '', body: '' });
      })
      .catch(error => console.error('Error sending email:', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Welcome, {user.name}</h1>

      <h2 style={{color:'green',textAlign:'center'}}>Your Emails</h2>
      <ul>
        {emails.map(email => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
      <div className="box">

        <h2 style={{color:'red',textAlign:'center'}}>Send a New Email</h2>
        <form onSubmit={handleSubmit} className="form">
          To : <br /><input type="email" name="to" value={newEmail.to} onChange={handleChange} placeholder="To" required /><br /><br />
          Subject : <br /><input type="text" name="subject" value={newEmail.subject} onChange={handleChange} placeholder="Subject" required /><br /><br />
          Body : <br /><textarea name="body" value={newEmail.body} onChange={handleChange} placeholder="Body" required /><br /><br />
          <button type="submit" style={{cursor:'pointer'}}>Send Email</button>
        </form>
      </div>
    </div>
  );
}

export default CommunicationDetails;
