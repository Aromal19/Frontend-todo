import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/TodoTable.css';

function TodoTable() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itemRoutes');
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError("Invalid ID provided");
      setMessage(null);
      return;
    }
  
    try {
      console.log(`Deleting todo with ID: ${id}`); // Debugging
      const response = await axios.delete(`http://localhost:3000/itemRoutes/${id}`);
      if (response.status === 200) {
        setMessage("✅ Todo deleted successfully!");
        setError(null);
        // Fetch fresh data after deletion instead of filtering locally
        fetchTodos();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setMessage(null);
      if (err.response?.status === 404) {
        setError("❌ Todo not found");
      } else {
        setError(err.response?.data?.error || "❌ Failed to delete todo");
      }
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Todo List</h2>
      
      {/* Show success message */}
      {message && (
        <div 
          className="alert alert-success text-center mb-4"
          style={{
            opacity: message ? 1 : 0,
            transform: message ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
          }}
        >
          {message}
        </div>
      )}

      {/* Show error message */}
      {error && (
        <div
          className="alert alert-danger text-center mb-4"
          style={{
            opacity: error ? 1 : 0, 
            transform: error ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
          }}
        >
          {error}
        </div>
      )}
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{todo.Todo}</h5>
                  <p className="card-text text-muted">
                    <small>
                      <i className="bi bi-calendar"></i> {new Date(todo.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <button 
                    className="btn btn-danger w-100"
                    onClick={() => handleDelete(todo._id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="card">
              <div className="card-body text-muted">
                No todos found
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoTable;
