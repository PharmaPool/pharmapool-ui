import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { jwtDecode } from "jwt-decode";

import images from "../../data/images";
import Loader from "../../components/Loader";

import { ValueContext } from "../../Context";

import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser, setName, setShow } = useContext(ValueContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpen(true);
    fetch("https://pharmapoolserver.com/api/auth/signin", {
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
      .then((res) => {
        if (res.error) {
          setError(true);
          setOpen(false);
        }

        setShow();
        const user = jwtDecode(res.token);
        setUser(user.user);
        setName(user.user.fullName.charAt(0));
        localStorage.setItem("userId", user.user._id);
        localStorage.setItem("token", res.token);

        // setShow()
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  const handleRemember = () => {
    setChecked(true);
    if (email !== "") {
      window.localStorage.setItem("email", email);
    }
    if (password !== "") {
      window.localStorage.setItem("password", password);
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("email");
    const rememberedPassword = localStorage.getItem("password");
    setEmail(rememberedEmail);
    setPassword(rememberedPassword);
  }, []);

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
                  <p>Invalid email or password</p>
                </div>
              )}
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
            <button
              onClick={handleSubmit}
              className={open ? "login_button_select" : "login_button"}
            >
              Log in
            </button>

            <div className="remember">
              <div className="me" onClick={handleRemember}>
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={checked}
                />
                <p>Remember me</p>
              </div>
              <div className="forgot">
                <a href="/forgot-password">Forgot password</a>
              </div>
            </div>
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
