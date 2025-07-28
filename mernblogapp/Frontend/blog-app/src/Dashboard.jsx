import React from 'react'
import { Outlet } from 'react-router-dom' 
import Dashnav from './Dashnav'

const Dashboard = () => {
  return (
   <div className='n'>
  

 
    
   <Dashnav/>
    <Outlet/>

   </div>
  )
}

export default Dashboard