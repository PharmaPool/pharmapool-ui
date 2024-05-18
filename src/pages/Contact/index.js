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
          Do not hesitate to reach out. Just fill in the contact form here and
          we’ll be sure to reply as fast as possible.
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
                href="mailto:Support@britishfx.net"
                style={{ color: "#0d47a1" }}
              >
                support@pharmapoolng.com
              </a>
            </div>
            <div className="socials">
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
          <Emailjs />
        </div>
      </section>
      <QuickLinks />
      <Footer />
    </>
  );
};

export default Contact;
