import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
const WithNav = () => {
  return (
    <>
        <Nav/>
        <Outlet/>
    </>
  )
}

export default WithNav