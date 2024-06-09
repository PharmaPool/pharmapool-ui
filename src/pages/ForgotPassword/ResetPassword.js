import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { jwtDecode } from "jwt-decode";

import Logo from "../../data/logo.png";
import Loading from "../../data/loader.gif";

import { ValueContext } from "../../Context";

import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const { setUser, setName } = useContext(ValueContext);
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auth/password-reset/${email}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.type === "token" || json.type === "user") {
          setErr(true);
          setMessage(json.error);
          setDisabled(true);
        }
        setToken(json.token);
      });
  }, []);

  const handleSubmit = () => {
    if (password !== password2) {
      setError(true);
    } else {
      setOpen(true);
      fetch(`http://127.0.0.1:8000/api/auth/password-reset/${token}`, {
        method: "POST",
        body: JSON.stringify({
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.type === "password") {
            setError(true);
          }
          setReset(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="login">
      {reset ? (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={Logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <p style={{ marginTop: "1rem" }}>Password reset successfully!</p>
            <p>
              <i>
                click to{" "}
                <a href="/signin">
                  <b>Login</b>
                </a>
              </i>
            </p>
          </div>
        </div>
      ) : (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={Logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <div className="other_inputs">
              <p style={{ marginBottom: "1rem" }}>Reset password</p>
              {error && (
                <div className="error_message" style={{ textAlign: "center" }}>
                  <p>Passwords don't match</p>
                </div>
              )}
              {err && (
                <div className="error_message" style={{ textAlign: "center" }}>
                  <p>{message}</p>
                </div>
              )}
              <input type="text" placeholder="Email" value={email} disabled />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                disabled={disabled}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={open ? "login_button_select" : "login_button"}
              disabled={disabled}
            >
              Reset
              {open && (
                <img src={Loading} alt="loading" width={100} height={100} />
              )}
            </button>
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
      )}
    </div>
  );
}

export default Login;
