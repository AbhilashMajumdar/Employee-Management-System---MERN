import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import Home from './components/Home'
import Navbar from './components/Navbar'
import ViewEmployee from './components/ViewEmployee'
import Employee from './components/Employee'
import SearchEmployee from './components/SearchEmployee'
import EditEmployee from './components/EditEmployee'
import PageNotFound from './components/PageNotFound'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/viewemployee' element={<ViewEmployee />} />
          <Route path='/employee/:id' element={<Employee />} />
          <Route path='/searchemployee' element={<SearchEmployee />} />
          <Route path='/editemployee/:id' element={<EditEmployee />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App