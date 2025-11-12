import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Home from './components/Home/Home'

import PrivateRoute from './components/PrivateRoute'
import ControlCenter from './components/Home/home-components/control-center/ControlCenter'

function App() {
  const [count, setCount] = useState(0);
  const [home, setHome] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<PrivateRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/control-center' element={<ControlCenter />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
