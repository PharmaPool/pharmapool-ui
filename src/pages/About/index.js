import React from "react";
import "./index.css";

import Header from "../../components/Header";
import QuickLinks from "../../components/QuickLinks";
import Footer from "../../components/Footer";
import Info from "./components/Info";
import Why from "./components/Why";
import MoreInfo from "./components/MoreInfo";
import images from "../../data/images";
import useWindowDimensions from "../../components/useWindowDimensions";

function About() {
  const { width } = useWindowDimensions();
  return (
    <>
      <Header />
      <div className="about">
        <h1>About Pharmapoolng</h1>
        <div className="about_intro">
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
        </div>
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
        <Why />
        <div className="process">
          <img src={images.process} alt="process" />
        </div>
        {width > 900 ? (
          <div className="large_method">
            <img src={images.largeMethod} alt="how we handle transactions" />
          </div>
        ) : (
          <div className="method">
            <h1>HOW WE HANDLE BUSINESS</h1>
            <img src={images.method} alt="how we handle transactions" />
          </div>
        )}
        {/* <MoreInfo /> */}
      </div>
      <QuickLinks />
      <Footer />
    </>
  );
}

export default About;
