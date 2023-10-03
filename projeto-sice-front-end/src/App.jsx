import { useState } from 'react'
import IndexHeader from './components/header'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >
        <IndexHeader />
        <Routes>
          <Route path='/home' element={<div>Home</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
