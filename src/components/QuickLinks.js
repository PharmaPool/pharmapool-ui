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
          <img src={Logo} alt="pharmapool logo" width={120} />
          <h4>Pharmapool Synergy Solutions Nigeria Limited</h4>
        </div>
        <p>
          <LocalPhoneIcon style={{ color: "#004d40" }} /> +2349033782254
        </p>
        <p>
          <MailIcon style={{ color: "#004d40" }} /> info@pharmapoolng.com
        </p>
        <p>
          <LocationOnIcon style={{ color: "#004d40" }} /> University of Nigeria
          Nsukka, Nsukka, Enugu state
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
        <div className="socials">
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
