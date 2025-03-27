import React from 'react'
import InsertTodo from './InsertTodo';
import TodoTable from './TodoTable';
import '../style/TodoPage.css'
function TodoPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      <InsertTodo />
      <TodoTable />
    </div>
  );
}
export default TodoPage