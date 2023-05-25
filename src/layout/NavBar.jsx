import React from 'react'
import { NavLink } from 'react-router-dom'



const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/posts">posts</NavLink></li>
        <li><NavLink to="/People">People</NavLink></li>
        <li><NavLink to="/Starships">Starships</NavLink></li>
        <li><NavLink to="/Species">Species</NavLink></li>
        <li><NavLink to="/admin">admin home</NavLink></li>
        
      </ul>
    </nav>
  )
}

export default NavBar