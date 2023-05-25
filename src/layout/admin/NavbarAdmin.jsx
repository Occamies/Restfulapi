import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarAdmin = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/admin">admin home</NavLink></li>
        <li><NavLink to="/">public home</NavLink></li>
        
      </ul>
    </nav>
  )
}

export default NavbarAdmin