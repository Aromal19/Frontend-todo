import React from 'react'
import '../style/TodoTable.css'


function TodoTable() {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="px-4 py-2">Task</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  );
}

export default TodoTable