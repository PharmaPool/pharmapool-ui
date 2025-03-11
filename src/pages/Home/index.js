import React, { useState, useEffect } from "react";
import "./index.css";

import Banner from "./component/Banner";
import Info from "./component/Info";
import Footer from "../../components/Footer";
import Reason from "./component/Reason";
import QuickLinks from "../../components/QuickLinks";
import Header from "../../components/Header";
import MoreInfo from "./component/MoreInfo";
import images from "../../data/images";
import ExtraInfo from "./component/ExtraInfo";
import Emailjs from "./component/Emailjs";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const [navBg, setNavSize] = useState(false);
  const navigate = useNavigate();

  const changeNavSize = () => {
    window.innerWidth <= 300 || window.scrollY >= 730
      ? setNavSize(true)
      : setNavSize(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavSize);
    window.addEventListener("resize", changeNavSize);
    return () => {
      window.removeEventListener("scroll", changeNavSize);
      window.removeEventListener("resize", changeNavSize);
    };
  }, []);
  return (
    <div className="landing_page">
      {navBg && <Header />}
      <Banner />
      <div className="pharmapool_intro">
        <h6>
          At <b style={{ color: "#004d40" }}>Pharmapool</b>, we're
          revolutionizing the way pharmacists and pharmacies do business. Our
          platform serves as a dynamic marketplace, connecting professionals in
          the pharmaceutical industry and facilitating collaborative ventures
          that drive growth and efficiency. We provide connections for our
          esteemed customers nationwide.
        </h6>
        <div className="intro_image">
          <img src={images.map} alt="map" />
        </div>
      </div>
      <Info />
      <div className="home_footer">
        <p>
          Click to{" "}
          <a href="/signup">
            <b>Register now!</b>
          </a>{" "}
          Build connections and expand your business.
        </p>
      </div>
      <div class="medicine_request">
        <h2>MAKE A REQUEST FOR YOUR MEDICINE</h2>
        <p>
          Click the button below to make request for your medicine from
          anywhere.
        </p>
        <br />
        <button class="button-1" onClick={() => navigate("/medicine_request")}>
          Request Medicine Now
        </button>
      </div>
      <div class="medicine_request">
        <h2>DONATE TO PHARMAPOOL</h2>
        <br />
        <button class="button-1" onClick={() => navigate("/donation")}>
          Donate
        </button>
      </div>
      <Reason />
      <MoreInfo />
      <div className="join_us">
        <div className="join">
          <h1>Ready to dive in?</h1>
          <div>
            <p>
              Join Pharmapool today and experience the future of pharmaceutical
              synergy. Sign up now to unlock a world of opportunities for your
              pharmacy or pharmacist career.
            </p>
            <button className="button-1">Register Now!</button>
          </div>
        </div>
      </div>
      <div className="certified">
        <img src={images.certified} alt="certified" width={100} />
        <h1>CAC CERTIFIED</h1>
      </div>

      <ExtraInfo />
      <Emailjs />
      <div class="medicine_request">
        <h2>DONATE TO PHARMAPOOL</h2>
        <br />
        <button class="button-1" onClick={() => navigate("/donation")}>
          Donate
        </button>
      </div>
      <QuickLinks />
      <Footer />
    </div>
  );
}

export default Homepage;
