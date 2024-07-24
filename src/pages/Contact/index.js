import React from "react";
import "./index.css";
import Header from "../../components/Header";

import QuickLinks from "../../components/QuickLinks";
import Footer from "../../components/Footer";

import Emailjs from "./component/Emailjs";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Contact = () => {
  return (
    <>
      <Header />
      <section className="contact">
        <h1>Contact Us</h1>
        <p style={{ fontSize: "1.3rem", color: "grey" }}>
          Drop us a message anytime! Our dedicated team is ready to ensure your
          experience is top-notch with swift responses.
        </p>
        <div className="con-con">
          <div className="visit">
            <div style={{ marginBottom: "3rem" }}>
              <h4>Visit our office</h4>
              <p>
                47 Ozomadu Close, St. Theresa's Road, Nsukka, Enugu State,
                Nigeria.
              </p>
            </div>
            <div className="message" style={{ marginBottom: "1rem" }}>
              <h4>Message us</h4>
              <a href="https://wa.me/447918134307" style={{ color: "#0d47a1" }}>
                +234 813 8413 948
              </a>
              <br />
              <a
                href="mailto:Support@pharmapoolng.com"
                style={{ color: "#0d47a1" }}
              >
                support@pharmapoolng.com
              </a>
            </div>
            <div className="socials">
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
          <Emailjs />
        </div>
      </section>
      <QuickLinks />
      <Footer />
    </>
  );
};

export default Contact;
