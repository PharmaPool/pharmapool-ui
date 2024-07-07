import React from "react";
import images from "../../../data/images";
import HowItWorks from "./HowItWorks";

function Info() {
  const services = [
    {
      type: "Drug Demand",
      details:
        "Tired of running out of essential medications? With Pharmapool, pharmacists and pharmacies can effortlessly request drugs that are unavailable in their local areas, ensuring uninterrupted service for their patients.",
    },
    {
      type: "Joint Purchase",
      details:
        "Harness the power of collective buying. Pharmacies can pool resources to purchase drugs in bulk, enabling cost savings and improved inventory management.",
    },
    {
      type: "Sales at Discount",
      details:
        "Stand out from the competition by offering discounted prices on select medications. Pharmapool provides a platform for pharmacies to attract customers with competitive pricing strategies.",
    },
  ];
  return (
    <div className="info">
      <h1>Our Services</h1>
      <div className="home_services">
        <div className="home_service">
          <div className="service_img">
            <img src={images.demand} alt="demand_image" />
          </div>
          <div className="service_details">
            <h3>{services[0].type}</h3>
            <p>{services[0].details}</p>
            <br />
            <HowItWorks business={"demand"} />
          </div>
        </div>
        <div className="home_serve">
          <div className="service_details">
            <h3>{services[1].type}</h3>
            <p>{services[1].details}</p>
            <br />
            <HowItWorks business={"joint purchase"} />
          </div>
          <div className="service_img">
            <img src={images.jointPurchase} alt="demand_image" />
          </div>
        </div>
        <div className="home_service">
          <div className="service_img">
            <img src={images.sale} alt="demand_image" />
          </div>
          <div className="service_details">
            <h3>{services[2].type}</h3>
            <p>{services[2].details}</p>
            <br />
            <HowItWorks business={"sale at discount"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
