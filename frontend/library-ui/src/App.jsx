import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Layout/NavBar'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddBook from './books/AddBook'
import EditBook from './books/EditBook'
import ViewBook from './books/ViewBook'


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/add-book' element={<AddBook/>}/>
          <Route exact path='/edit-book/:id' element={<EditBook/>}/>
          <Route exact path='/view-book/:id' element={<ViewBook/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
