import React from 'react'
import { NavLink } from 'react-router-dom'



const NavBar = () => {
  return (
    <nav>
      <ul>
        {/* posts */}
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/posts">posts</NavLink></li>
        {/* starwars */}
        <li><NavLink to="/People">People</NavLink></li>
        <li><NavLink to="/Starships">Starships</NavLink></li>
        <li><NavLink to="/Species">Species</NavLink></li>
        {/* news */}
        <li><NavLink to="/News1">News1</NavLink></li>
        <li><NavLink to="/News2">News2</NavLink></li>
        {/* admin */}
        <li><NavLink to="/admin">admin home</NavLink></li>
        
      </ul>
    </nav>
  )
}

export default NavBar