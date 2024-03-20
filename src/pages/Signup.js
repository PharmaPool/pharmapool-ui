import React, { useState } from "react";

import Logo from "../data/logo.png";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:6000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone,
        state: state,
        address: address,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="signup">
      <div className="writeup">
        <h1 className="writeup_black">The best offer</h1>
        <h1 className="writeup_green">for your business</h1>
        <p>
          with <b>Pharmapool</b>, your pharmacy is connected.
        </p>
      </div>
      <div className="signup_form">
        <div className="sign_form">
          <img src={Logo} alt="pharmapool logo" width={80} />
          <div className="other_input">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="email"
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
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Register</button>
          <p>
            Already a user,{" "}
            <i>
              click to{" "}
              <a href="/signin">
                <b>Login</b>
              </a>
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
