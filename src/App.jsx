import { useState } from 'react'
import TodoPage from './components/TodoPage'
import './style/index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TodoPage></TodoPage>
    </>
  )
}

export default App
