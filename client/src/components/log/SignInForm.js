import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailErrors = document.getElementById("email");
    const passwordErrors = document.getElementById("password");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/signIn`,
      withCredentials: true,
      data: { email, password },
    })
      .then((res) => {
        if (res.data.errors) {
          emailErrors.innerHTML = res.data.errors.email;
          passwordErrors.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form action="" id="sign-in-form" onSubmit={handleLogin}>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        ></input>
        <div id="email" className="email-error"></div>
        <br></br>
        <input
          type="text"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          placeholder="password"
        ></input>
        <div id="password" className="password-error"></div>
        <br></br>
        <input type="submit" name="submit" id="submit" value="Login"></input>
        <br></br>
      </form>
    </div>
  );
};

export default SignInForm;
