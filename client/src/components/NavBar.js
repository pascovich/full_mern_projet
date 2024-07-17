import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";
import { useSelector } from "react-redux";

const NavBar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div>
        <NavLink to="/">
          <img src="./img/icon.png" alt="inmage 404" />
          <h4>Renovaa Title</h4>
        </NavLink>
      </div>
      {uid ? (
        <ul>
          <li></li>
          <li className="welcome">
            <NavLink to="/profil">
              <h5>Bienvenu userData.user.pseudo</h5>
              {/* <h5>Bienvenu {userData.user.pseudo}</h5> */}
            </NavLink>
          </li>
          <Logout />
        </ul>
      ) : (
        <ul>
          <li></li>
          <li>
            <NavLink to="/profil">
              <img src="./img/icons/login.svg" alt="logo login" />
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
