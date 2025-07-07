import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/tasks');
        if (isMounted) setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getStyle = (task) => {
    if (task.status) return { background: 'white', color: 'black' };
    const colors = {
      Office: 'red',
      Personal: 'yellow',
      Family: 'green',
      Friends: 'cyan',
      Other: 'gray'
    };
    return { background: colors[task.type] || 'lightgray', color: task.type === 'Personal' || task.type === 'Friends' ? 'black' : 'white' };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{textAlign:'center'}}>All Tasks</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center' }}>
        {data.map(task => (
          <div
            key={task.id}
            style={{
              ...getStyle(task),
              padding: '10px',
              width: '200px',
              border: '1px solid black'
            }}
          >
            <p><b>{task.task}</b></p>
            <p>{task.username}</p>
            <p>{task.date}</p>
            <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
            <p>Type: {task.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
