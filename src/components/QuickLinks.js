import React from "react";

import Logo from "../data/logo.png";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

function QuickLinks() {
  return (
    <div className="quicklinks">
      <div className="company_info">
        <div className="quick_logo">
          <img src={Logo} alt="pharmapool logo" width={50} />
          <h4>Pharmapool Synergy Solutions Nigeria Limited</h4>
        </div>
        <p>
          <LocalPhoneIcon style={{ color: "#004d40" }} /> +2348138413948
        </p>
        <p>
          <MailIcon style={{ color: "#004d40" }} /> support@pharmapoolng.com
        </p>
        <p>
          <LocationOnIcon style={{ color: "#004d40" }} /> 47 Ozomadu Close, St.
          Theresa's Road, Nsukka, Enugu State, Nigeria.
        </p>
      </div>
      <div className="quick_info">
        <h3>Sign up Now!</h3>
        <p>
          Join us today and bring your pharmacy to light. Build connections and
          expand your business.
        </p>
        <a href="/signup">
          <button className="button-1">Register Now!</button>
        </a>
        <hr />
        <div className="socials sos">
          <a href="#">
            <XIcon />
          </a>
          <a href="#">
            <LinkedInIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <FacebookIcon />
          </a>
        </div>
      </div>
      <div className="quick_links">
        <a href="/">Home</a>
        <a href="/business">Business</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/signup">Register</a>
        <a href="/Signin">Login</a>
      </div>
    </div>
  );
}

export default QuickLinks;
