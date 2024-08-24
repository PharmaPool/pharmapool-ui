import React from "react";

import images from "../data/images";
import GoogleTrans from "./GoogleTrans";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import VerifiedIcon from "@mui/icons-material/Verified";

function QuickLinks() {
  // const userId = localStorage.getItem("userId");
  // const url = `/verify/signin?redirectTo=/profile/${userId}`;
  return (
    <div className="quicklinks">
      <div className="quicklinks_first">
        <div className="quick_links">
          <h6>Quick links</h6>
          <a href="/">Home</a>
          <a href="/business">Business</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/signup">Signup</a>
          <a href="/Signin">Signin</a>
        </div>
        <div className="quick_info">
          <h3>Sign up Now!</h3>
          <p>
            Join us today and bring your pharmacy to light. Build connections
            and expand your business.
          </p>
          <a href="/signup">
            <button className="button-1">Sign up Now!</button>
          </a>
        </div>
        <div className="quick_links">
          <h6>Account links</h6>
          <a href="/verify/signin?redirectTo=/posts">Posts</a>
          <a href="/verify/signin?redirectTo=/private_business">Business</a>
          <a href="/verify/signin?redirectTo=/chatrooms">Chatrooms</a>
          <a href="/verify/signin?redirectTo=/chats">Chats</a>
          <a href="/verify/signin?redirectTo=/notifications">Notifications</a>
          <a href={`/verify/signin?redirectTo=/profile`}>Profile</a>
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
    </div>
  );
}

export default QuickLinks;
