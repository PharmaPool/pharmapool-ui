import React, { useState } from "react";
import "./index.css";

import images from "../../data/images";
import Loading from "../../data/loader.gif";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpen(true);
    if (email === "") {
      setError(true);
      setOpen(false);
    } else {
      fetch("https://pharmapoolserver.com/api/auth//password-reset", {
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
          if (res.type === "email") {
            setError(true);
          }
          setSuccess(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login">
      {success ? (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={images.logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <p style={{ marginTop: "1rem" }}>
              An email with the password reset link has been sent to{" "}
              {email.substring(0, 3)}*********
              {email.substring(email.length - 10, email.length)}
            </p>
            <p>Link becomes invalid after an hour</p>
          </div>
        </div>
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
              <p style={{ marginBottom: "1rem" }}>
                Enter email to reset password
              </p>
              {error && (
                <div className="error_message" style={{ textAlign: "center" }}>
                  <p>Invalid email</p>
                </div>
              )}
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setError(false);
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={open ? "login_button_select" : "login_button"}
            >
              Submit
              {open && (
                <img src={Loading} alt="loading" width={100} height={100} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
