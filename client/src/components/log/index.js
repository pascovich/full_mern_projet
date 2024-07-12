import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [signInModal, setsignInModal] = useState(props.signIn);

  const handleModal = (e) => {
    if (e.target.id === "login") {
      setsignInModal(true);
    } else if (e.target.id === "register") {
      setsignInModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        {/* <button onClick={() => handleClick("login")}>Connexion</button>
        <button onClick={() => handleClick("register")}>Inscription</button> */}
        <ul>
          <li onClick={handleModal} id="login">
            SignIn
          </li>
          <li onClick={handleModal} id="register">
            SignUp
          </li>
        </ul>
        {signInModal ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Log;
