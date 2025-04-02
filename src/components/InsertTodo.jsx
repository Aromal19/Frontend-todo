import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import '../style/InsertTodo.css';

function InsertTodo() {
  const [todo, setTodo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // Fetch the current date dynamically when submitting
    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await axios.post('http://localhost:3000/itemRoutes', {
        Todo: todo,
        date: currentDate, // Use the auto-fetched current date
      });

      if (response.status === 200) {
        setTodo('');
        setMessage('✅ Todo added successfully!');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setMessage('❌ Failed to add todo. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 text-primary">Add a New Todo</h2>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
              {/* Todo Input */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Enter your task..."
                  required
                />
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-plus-circle"></i> Add Todo
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setTodo('');
                    setMessage('');
                  }}
                >
                  <i className="bi bi-x-circle"></i> Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertTodo;
