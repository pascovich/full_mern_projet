import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";

const NavBar = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      <div>
        <NavLink exact to="/">
          <img src="./img/icon.png" alt="inmage 404" />
          <h4>Renovaa Title</h4>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li></li>
          <li className="welcome">
            <NavLink exact to="/profil">
              <h5>User login</h5>
            </NavLink>
          </li>
        </ul>
      ) : (
        <h4>Logo</h4>
      )}
    </nav>
  );
};

export default NavBar;
