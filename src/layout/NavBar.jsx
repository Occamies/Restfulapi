import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        {/* posts */}
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/posts">posts</NavLink>
        </li>
        {/* starwars */}
        <li role="list">
          Swapi
          <ul>
            <li>
              <NavLink to="/People">People</NavLink>
            </li>
            <li>
              <NavLink to="/Starships">Starships</NavLink>
            </li>
            <li>
              <NavLink to="/Species">Species</NavLink>
            </li>
          </ul>
        </li>

        {/* news */}
        <li role="list">News
        <ul>
          <li>
            <NavLink to="/News1">News1</NavLink>
          </li>
          <li>
            <NavLink to="/News2">News2</NavLink>
          </li>
        </ul>
        </li>
        {/* rapidApi */}
        <li>
          <NavLink to="/Facts">Facts</NavLink>
        </li>
        <li>
          <NavLink to="/Hobby">Hobby</NavLink>
        </li>
        <li>
          <NavLink to="/LovaCalc">LovaCalc</NavLink>
        </li>
        <li>
          <NavLink to="/FreeToPlay">FreeToPlay</NavLink>
        </li>
        <li>
          <NavLink to="/CykelStativ">CykelStativ</NavLink>
        </li>
        {/* admin */}
        <li>
          <NavLink to="/admin">admin home</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
