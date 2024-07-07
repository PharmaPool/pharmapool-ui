import React, { useState, useEffect } from "react";
import "./index.css";

import images from "../../data/images";

import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const {_id} = useParams()
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/auth/verify/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          setVerified(true);
        }
      });
  }, []);

  return (
    <div className="login">
      {verified && (
        <div className="signin_form">
          <div className="sig_form">
            <img
              src={images.logo}
              alt="pharmapool logo"
              width={80}
              onClick={() => navigate("/")}
            />
            <div className="other_inputs">
              <p>Account verification successful!</p>
              <p>
                Click to{" "}
                <b
                  style={{
                    fontSize: "larger",
                    color: "#004d40",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/verify/signin`)}
                >
                  <i>Login</i>
                </b>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
