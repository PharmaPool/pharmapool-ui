import React, { useState } from "react";
import "./index.css";

import images from "../../data/images";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setShow(true);
    fetch("http://127.0.0.1:8000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        phoneNumber: phone,
        state: state,
        address: address,
        registrationNumber,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.type === "email") {
          setMessage(json.error);
        } else {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("userId", json.user._id);
          navigate(`/verify`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {show ? (
        <Loader />
      ) : (
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
              <img
                src={images.logo}
                alt="pharmapool logo"
                width={60}
                onClick={() => navigate("/")}
              />
              <div className="other_input">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                {message !== "" && (
                  <div className="error_message">
                    <small>{message}</small>
                  </div>
                )}
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
                <input
                  type="text"
                  placeholder="PCN Reg. No. (for pharmacist only)"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
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
      )}
    </>
  );
}

export default Signup;
