import React from "react";
import Demand from "../../../data/demand.png"
import JointPurchase from "../../../data/joint purchase.png"
import Sale from "../../../data/sale.png"

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
            <img src={Demand} alt="demand_image" />
          </div>
          <div className="service_details">
            <h3>{services[0].type}</h3>
            <p>{services[0].details}</p>
          </div>
        </div>
        <div className="home_serve">
          <div className="service_details">
            <h3>{services[1].type}</h3>
            <p>{services[1].details}</p>
          </div>
          <div className="service_img">
            <img src={JointPurchase} alt="demand_image" />
          </div>
        </div>
        <div className="home_service">
          <div className="service_img">
            <img src={Sale} alt="demand_image" />
          </div>
          <div className="service_details">
            <h3>{services[2].type}</h3>
            <p>{services[2].details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
