import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(false);
  const [type, setType] = useState('Office');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.length < 3 || !username || !date) {
      alert("Please fill all fields properly");
      return;
    }
    onAdd({ task, username, date, status, type });
    setTask(''); setUsername(''); setDate(''); setStatus(false); setType('Office');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
      <textarea value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task (min 3 char)" required />
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="number" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Office</option>
        <option>Personal</option>
        <option>Family</option>
        <option>Friends</option>
        <option>Other</option>
      </select>
      <label>
        Completed
        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
      </label>
      <button type="submit">Make Task</button>
    </form>
  );
};

export default TodoForm;