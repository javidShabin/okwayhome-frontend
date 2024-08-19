import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Userlayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <footer>footer</footer>
    </div>
  )
}

export default Userlayout
