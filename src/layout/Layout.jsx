import React from 'react'
import Headers from "./Header"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Headers/>
    <NavBar/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout