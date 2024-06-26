import React, { useState, useEffect } from "react";
import "./index.css";

import Banner from "./component/Banner";
import Info from "./component/Info";
import Footer from "../../components/Footer";
import Reason from "./component/Reason";
import QuickLinks from "../../components/QuickLinks";
import Header from "../../components/Header";
import MoreInfo from "./component/MoreInfo";

function Homepage() {
  const [navBg, setNavSize] = useState(false);

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
        <h5>
          At <b style={{ color: "#004d40" }}>Pharmapool</b>, we're
          revolutionizing the way pharmacists and pharmacies do business. Our
          platform serves as a dynamic marketplace, connecting professionals in
          the pharmaceutical industry and facilitating collaborative ventures
          that drive growth and efficiency.
        </h5>
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
      <Reason />
      <MoreInfo />
      <div className="join_us">
        <div className="join">
          <h3>Ready to dive in?</h3>
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
      <QuickLinks />
      <Footer />
    </div>
  );
}

export default Homepage;
