import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import InsertTodo from './InsertTodo';
import TodoTable from './TodoTable';
import '../style/TodoPage.css';

function TodoPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTodoAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Todo Section */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <InsertTodo onTodoAdded={handleTodoAdded} />
          </section>

          {/* Todo List Section */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <TodoTable key={refreshKey} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;