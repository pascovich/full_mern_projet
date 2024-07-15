import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setcontrolPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.getElementById("pseudo");
    const emailError = document.getElementById("email");
    const passwordd = document.getElementById("password");
    const passwordConfirmError = document.getElementById("password-confirm");
    const termsError = document.getElementById("termsError");

    passwordConfirmError.textContent = "";
    termsError.textContent = "";

    if (passwordd != controlPassword || !terms.checked) {
      if (passwordd != controlPassword) {
        passwordConfirmError.textContent =
          "Les 2 mots de passe ne correspondent pas";
      }
      if (!terms.checked) {
        termsError.textContent =
          "Vous devez accepter les conditions générales d'utilisation";
      } else {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}api/user/users`,
          data: {
            pseudo,
            email,
            password,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.errors) {
              pseudoError.textContent = res.data.errors.pseudo;
              emailError.textContent = res.data.errors.email;
              passwordConfirmError.textContent = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4>User identified successfully</h4>
        </>
      ) : (
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
            type="text"
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
      )}
    </div>
  );
};

export default SignUpForm;
