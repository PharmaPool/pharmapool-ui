import React from "react";

import Logo from "../../../data/logo.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

function Banner() {
  return (
    <div className="banner">
      <div className="home_socials">
        <div className="home_logo">
          {/* <img src={Logo} alt="pharmapool logo" width={60}/> */}
        </div>
        <div className="home_social">
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
      <div className="title">
        <div className="title_image">
          <img src={Logo} alt="pharmapool logo" width={100} />
        </div>
        <p>welcome to</p>
        <h1>Pharmapool Synergy Solutions Nigeria Limited.</h1>
        <small>with pharmapool, your pharmacy is connected.</small>
        <a href="/signup">
          <button className="business_button">Register Now!</button>
        </a>
      </div>
      <div className="banner_footer">
        <div className="links">
          <a href="/">Home</a>
          <a href="/business">Business</a>
          <a href="/about">About us</a>
          <a href="/contact">Contact</a>
          <a href="/signin">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
