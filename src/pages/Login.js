import React, { useState } from "react";

import Logo from "../data/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://glitch.com/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <div className="signin_form">
        <div className="sig_form">
          <img src={Logo} alt="pharmapool logo" width={160} />
          <div className="other_inputs">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Log in</button>
          <p>
            Not a user,{" "}
            <i>
              click to{" "}
              <a href="/signup">
                <b>Register</b>
              </a>
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
