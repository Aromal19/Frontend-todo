import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../style/TodoTable.css';

function TodoTable() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://backend-todo-1-doce.onrender.com/itemRoutes');
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`https://backend-todo-1-doce.onrender.com/itemRoutes/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your todo has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete todo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4 text-primary font-weight-bold">Your Todos</h2>
      {todos.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted">No todos yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="row">
          {todos.map((todo) => (
            <div key={todo._id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title mb-2">{todo.Todo}</h5>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(todo._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  <p className="card-text text-muted">
                    <small>Added on: {new Date(todo.date).toLocaleDateString()}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoTable;
