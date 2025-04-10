import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../style/InsertTodo.css';

function InsertTodo({ onTodoAdded }) {
  const [todo, setTodo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // To verify form submission
    setMessage('');

    if (!todo.trim()) {
      Swal.fire({
        title: 'Empty Todo!',
        text: 'Please enter a task before adding.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    try {
      const response = await axios.post('http://localhost:3000/itemRoutes', {
        Todo: todo,
        date: currentDate,
      });

      console.log('Response status:', response.status);

      if (response.status === 200 || response.status === 201) {
        setTodo('');

        await Swal.fire({
          title: 'Success!',
          text: 'Todo added successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Great!',
          timer: 1500,
          showConfirmButton: false
        });

        onTodoAdded();
      } else {
        Swal.fire({
          title: 'Unexpected Response',
          text: `Status: ${response.status}`,
          icon: 'info',
        });
      }

    } catch (error) {
      console.error('Error adding todo:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add todo. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 bg-white rounded-lg border-0">
            <h2 className="text-center mb-4 text-primary font-weight-bold">Add a New Todo</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg border-2"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Enter your task..."
                  required
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success btn-lg px-4">
                  <i className="bi bi-plus-circle me-2"></i> Add Todo
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg px-4"
                  onClick={() => {
                    setTodo('');
                    setMessage('');
                  }}
                >
                  <i className="bi bi-x-circle me-2"></i> Clear
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
