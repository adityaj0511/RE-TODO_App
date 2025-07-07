import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/tasks');
        if (isMounted) setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
    return () => {
      isMounted = false;
    };
  }, []);

  const addTask = async (taskData) => {
    await axios.post('http://localhost:3001/tasks', taskData);
    const res = await axios.get('http://localhost:3001/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const res = await axios.get('http://localhost:3001/tasks');
    setTasks(res.data);
  };

  const toggleStatus = async (task) => {
    await axios.patch(`http://localhost:3001/tasks/${task.id}`, { status: !task.status });
    const res = await axios.get('http://localhost:3001/tasks');
    setTasks(res.data);
  };

  const getStyle = (task) => {
    if (task.status) return { background: 'white', color: 'black' };
    const colors = {
      Office: 'red',
      Personal: 'yellow',
      Family: '#06923E',
      Friends: 'cyan',
      Other: 'gray'
    };
    return { background: colors[task.type] || 'lightgray', color: task.type === 'Personal' || task.type === 'Friends' ? 'black' : 'white' };
  };

  let filtered = tasks.filter(t => t.task.toLowerCase().includes(search.toLowerCase()));
  filtered = filtered.sort((a, b) => sortAsc ? a.task.localeCompare(b.task) : b.task.localeCompare(a.task));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input placeholder="Search task" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => setSortAsc(!sortAsc)}>Sort</button>
      </div>
      <TodoForm onAdd={addTask} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center' }}>
        {paginated.map(task => (
          <div
            key={task.id}
            style={{
              ...getStyle(task),
              padding: '10px',
              width: '250px',
              border: '1px solid black'
            }}
          >
            <p><b>{task.task}</b></p>
            <p>{task.username}</p>
            <p>{task.date}</p>
            <input type="checkbox" checked={task.status} onChange={() => toggleStatus(task)} />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '50px',marginLeft:'45%'}}>
        <button style={{padding:'10px 20px' }} onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <button style={{padding:'10px 20px',marginLeft:'20px' }} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default TodoList;