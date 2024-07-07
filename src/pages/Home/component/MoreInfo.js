import React from "react";
import images from "../../../data/images";
import VerifiedIcon from "@mui/icons-material/Verified";

function Info() {
  const services = [
    {
      type: "Our Team",
      details: "24/7 Availability",
    },
    {
      type: "Our Process",
      details: "Verified",
    },
    {
      type: "Our Transactions",
      details: "100% Secured",
    },
  ];
  return (
    <div className="info">
      <div className="home_services">
        <div className="home_serv">
          <div className="service_details">
            <h3>{services[0].type}</h3>
            <h1>{services[0].details}</h1>
          </div>
          <div className="servic_img">
            <img src={images[247]} alt="demand_image" />
          </div>
        </div>

        <div className="home_servic">
          <div className="servic_img">
            <img src={images.transparency} alt="demand_image" />
          </div>
          <div className="service_details">
            <h3>{services[2].type}</h3>
            <h1>{services[2].details}</h1>
          </div>
        </div>
        <div className="home_serv">
          <div className="service_details">
            <h3>{services[1].type}</h3>
            <h1>
              <VerifiedIcon fontSize="2rem" />
              {services[1].details}
            </h1>
          </div>
          <div className="servic_img">
            <img src={images.verified} alt="demand_image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
