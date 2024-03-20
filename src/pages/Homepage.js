import React, { useState, useEffect } from "react";

import Banner from "../components/Banner";
import Info from "../components/Info";
import Footer from "../components/Footer";
import Reason from "../components/Reason";
import QuickLinks from "../components/QuickLinks";
import Header from "../components/Header";

function Homepage() {
  const [navBg, setNavSize] = useState(false);

  const changeNavSize = () => {
    window.innerWidth <= 700 || window.scrollY >= 730
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
      <QuickLinks />
      <Footer />
    </div>
  );
}

export default Homepage;
