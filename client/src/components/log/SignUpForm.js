import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setcontrolPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.getElementById("pseudo");
    const emailError = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordConfirmError = document.getElementById("password-confirm");
    const termsError = document.getElementById("termsError");

    if (password != controlPassword || !terms.checked) {
      if (password != controlPassword) {
        passwordConfirmError.textContent =
          "Les mots de passe ne correspondent pas";
      }
      if (!terms.checked) {
        termsError.textContent =
          "Vous devez accepter les conditions générales d'utilisation";
      }
    } else {
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} id="sign-up-form">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        ></input>
        <div id="email"></div>
        <br />
        <input
          type="text"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
          placeholder="pseudo"
        ></input>
        <div id="pseudo"></div>
        <br />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        ></input>
        <div id="password"></div>
        <br />
        <input
          type="password"
          onChange={(e) => setcontrolPassword(e.target.value)}
          value={controlPassword}
          placeholder="confirm password"
        ></input>
        <div id="password-confirm"></div>
        <br />
        <input type="checkbox" id="terms" />
        <div id="termsError"></div>
        <input type="submit" value="SignUp" />
      </form>
    </div>
  );
};

export default SignUpForm;
