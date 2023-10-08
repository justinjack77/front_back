import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './AccountPage/Login'
import Home from './Pages/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='*'element={<div>Page Not Found</div>}></Route>
        {/* <Route path='/' element={<Home/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
