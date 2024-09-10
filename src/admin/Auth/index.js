import React, { useState, useContext } from "react";
import "./index.css";
import { jwtDecode } from "jwt-decode";

import images from "../../data/images";
import Loader from "../../components/Loader";

import { ValueContext } from "../../Context";

import { useNavigate } from "react-router-dom";

function Signin() {
  const { setUser, setName, setShow } = useContext(ValueContext);
  const [email, setEmail] = useState("info@pharmapoolng.com");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpen(true);
    fetch("https://www.pharmapoolserver.com/api/auth/admin/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(!error);
          setSuccess(false);
          setOpen(false);
        }

        setShow(false);
        setSuccess(true);
        setRequested(true);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePasskey = () => {
    setOpen(true);
    fetch("https://www.pharmapoolserver.com/api/auth/admin/passkey", {
      method: "POST",
      body: JSON.stringify({
        email,
        passkey: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          setError(true);
          setOpen(false);
        }

        setShow();
        // const user = jwtDecode(res.token);
        // setUser(user.user);
        // setName(user.user.fullName.charAt(0));
        // localStorage.setItem("userId", user.user._id);
        localStorage.setItem("token", res.token);

        navigate("/admin/overview");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      {open ? (
        <Loader />
      ) : (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={images.logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <div className="other_inputs">
              {error && (
                <div className="error_message" style={{ textAlign: "center" }}>
                  <p>Invalid admin</p>
                </div>
              )}
              {success && (
                <div className="error_message" style={{ textAlign: "center" }}>
                  <p>Code sent</p>
                </div>
              )}
              <input type="text" placeholder="Email" value={email} readOnly />
              <input
                type="text"
                placeholder="Passkey"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {requested ? (
              <button
                onClick={handlePasskey}
                className={open ? "login_button_select" : "login_button"}
              >
                Signin
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={open ? "login_button_select" : "login_button"}
              >
                Get code
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
