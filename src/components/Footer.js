import React from "react";

import TermsAndPrivacyPolicy from "../data/PHARMAPOOL TERMS OF SERVICE.pdf"

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <small>© 2024 Pharmapool | All Rights Reserved</small>
      </div>
      <div className="privacy">
        <small>
          <a href={TermsAndPrivacyPolicy}>
            Terms & Privacy Policy
          </a>
        </small>
      </div>
    </div>
  );
};

export default Footer;
