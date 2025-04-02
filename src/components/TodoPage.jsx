import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import InsertTodo from './InsertTodo';
import TodoTable from './TodoTable';
import '../style/TodoPage.css'

function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">
              My Todo List
            </h1>
            <p className="text-gray-600">Organize your tasks efficiently</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <div className="bg-indigo-50 rounded-lg p-6 h-full">
                <InsertTodo />
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-purple-50 rounded-lg p-6 h-full">
                <TodoTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage