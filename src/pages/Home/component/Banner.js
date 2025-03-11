import React from "react";

import images from "../../../data/images";
import banner from "./banner.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className="banner">
      <div className="home_socials">
        <div className="home_logo">
          {/* <img src={Logo} alt="pharmapool logo" width={60}/> */}
        </div>
        <div className="home_social">
          <a href="https://x.com/pharmapool_ng">
            <XIcon />
          </a>
          <a href="https://www.linkedin.com/in/pharmapool-pharmapool-521656317/">
            <LinkedInIcon />
          </a>
          <a href="https://www.instagram.com/pharmapool_ng/">
            <InstagramIcon />
          </a>
          <a href="https://web.facebook.com/profile.php?id=61563092285684">
            <FacebookIcon />
          </a>
        </div>
      </div>
      <div className="home_banner">
        <div className="title">
          <div className="title_image">
            <img src={images.logo} alt="pharmapool logo" width={100} />
          </div>
          <p>Welcome to</p>
          <h1>Pharmapool Synergy Solutions Nigeria Limited.</h1>
          <small>with pharmapool, your pharmacy is connected.</small>
          <a href="/signup">
            <button className="business_button">Sign up Now!</button>
          </a>
          <br />
          <button
            class="business_button"
            onClick={() => navigate("/medicine_request")}
          >
            Request Medicine Now!
          </button>
          <br />
          <button class="business_button" onClick={() => navigate("/donation")}>
            Donate to Pharmapool
          </button>
        </div>
        <div className="banner_display">
          <div className="banner_display_image">
            <img src={banner} alt="pharmapool_logo" />
          </div>
        </div>
      </div>
      <div className="banner_footer">
        <div className="links">
          <a href="/business">Business</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/signin">Signin</a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
