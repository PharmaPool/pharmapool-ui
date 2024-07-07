import React from "react";

import images from "../data/images";
import GoogleTrans from "./GoogleTrans";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import VerifiedIcon from "@mui/icons-material/Verified";

function QuickLinks() {
  return (
    <div className="quicklinks">
      <div className="quicklinks_first">
        <div className="quick_links">
          <h6>Quick links</h6>
          <a href="/">Home</a>
          <a href="/business">Business</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/signup">Register</a>
          <a href="/Signin">Login</a>
        </div>
        <div className="quick_info">
          <h3>Sign up Now!</h3>
          <p>
            Join us today and bring your pharmacy to light. Build connections
            and expand your business.
          </p>
          <a href="/signup">
            <button className="button-1">Register Now!</button>
          </a>
        </div>
        <div className="quick_links">
          <h6>Account links</h6>
          <a href="/Signin">Posts</a>
          <a href="/Signin">Business</a>
          <a href="/Signin">Chatrooms</a>
          <a href="/Signin">Chats</a>
          <a href="/Signin">Notifications</a>
          <a href="/Signin">Profile</a>
        </div>
      </div>
      <div className="company_info">
        <div className="quick_logo">
          <img src={images.logo} alt="pharmapool logo" width={70} />
        </div>
        <h4>Pharmapool Synergy Solutions Nigeria Limited</h4>
        <p>with pharmapool, your pharmacy is connected.</p>
      </div>

      <div className="quicklinks_bottom">
        <div className="quicklink_foot1">
          <h6 style={{ margin: "0px" }}>
            CAC Certified <VerifiedIcon />
          </h6>
        </div>
        <div className="quicklink_foot2">
          <GoogleTrans />
        </div>
        <div className="socials sos">
          <a href="https://x.com/pharmapoolng">
            <XIcon />
          </a>
          <a href="https://www.linkedin.com/in/pharmapool-pharmapool-521656317/">
            <LinkedInIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="https://web.facebook.com/profile.php?id=61561532954556">
            <FacebookIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuickLinks;
