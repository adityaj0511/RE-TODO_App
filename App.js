import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoList from './TodoList';
import Home from './Home';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', display: 'flex', gap: '10px',justifyContent: 'center' }}>
        <Link to="/" style={{ color: 'black' }}>Home</Link>
        <Link to="/todo" style={{ color: 'black' }}>Todo App</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
