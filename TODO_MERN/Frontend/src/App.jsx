import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import ShowTask from './pages/ShowTask'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='/task-list' element={<TaskListPage/>} />
          <Route path='/show-task/:taskid' element={<ShowTask/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App