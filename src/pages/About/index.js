import React from "react";
import "./index.css";

import Header from "../../components/Header";

import PeopleIcon from "@mui/icons-material/People";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QuickLinks from "../../components/QuickLinks";
import Footer from "../../components/Footer";
import Info from "./components/Info";

function About() {
  return (
    <>
      <Header />
      <div className="about">
        <h1>About Pharmapoolng</h1>
        <p>
          Welcome to{" "}
          <b style={{ color: "#004d40" }}>
            Pharmapool Synergy Solutions Nigeria Limited
          </b>
          , Pharmapool, your trusted bridge to seamless pharmaceutical
          connections! At Pharmapool, we specialize in facilitating dynamic
          interactions between pharmacies and pharmacists, creating a thriving
          ecosystem for collaborative business ventures.
        </p>
        <div className="mission">
          <h2>Our Vision</h2>
          <p>
            In a world where the demand for pharmaceutical solutions is
            ever-evolving, Pharmapool envisions a future where pharmacies
            seamlessly connect, collaborate, and thrive. Our vision is to create
            an ecosystem that goes beyond transactions, fostering a community
            where the collective strength of pharmacies propels the industry
            forward.
          </p>
        </div>
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            Empowering the pharmaceutical community by fostering efficient and
            cost-effective connections, Pharmapool is dedicated to
            revolutionizing the way pharmacies and pharmacists engage in
            commerce. We strive to enhance accessibility, streamline operations,
            and promote unity within the pharmaceutical industry.
          </p>
        </div>
        <br />
        <Info />
        <h4>Why choose Pharmapool?</h4>
        <div className="strengths">
          <div className="strength">
            <LightbulbCircleIcon
              style={{ fontSize: "5rem", color: "#00695c" }}
            />
            <h5>Efficiency</h5>
            <p>
              Pharmapool streamlines the procurement process, saving time and
              resources for pharmacies and pharmacists.
            </p>
          </div>
          <div className="strength">
            <AccountBalanceIcon
              style={{ fontSize: "5rem", color: "#00695c" }}
            />
            <h5>Costs Savings</h5>
            <p>
              Our Joint Purchase and Sales at Discount services provide
              opportunities for significant cost savings, promoting financial
              sustainability.
            </p>
          </div>
          <div className="strength">
            <PeopleIcon style={{ fontSize: "5rem", color: "#00695c" }} />
            <h5>Community Building</h5>
            <p>
              Pharmapool fosters a sense of community within the pharmaceutical
              industry, encouraging collaboration and mutual support.
            </p>
          </div>
          <div className="strength">
            <SyncLockIcon style={{ fontSize: "5rem", color: "#00695c" }} />
            <h5>Secure Payment System</h5>
            <p>
              Pharmapool prioritizes the security of financial transactions on
              our platform. With a robust and reliable payment system, we ensure
              that all monetary transactions taking place within our ecosystem
              are managed securely, providing peace of mind to our users.
            </p>
          </div>
        </div>
      </div>
      <QuickLinks />
      <Footer />
    </>
  );
}

export default About;
