import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import CreateEmployee from './pages/createEmployee'
import EmployeeList from './pages/employeeList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<CreateEmployee/>}/>
          <Route path="employeeList" element={<EmployeeList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
