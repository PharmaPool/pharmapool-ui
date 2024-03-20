import React from 'react'

function Info() {
  return (
    <div className="info">
      <h1>Our Services</h1>
      <div className="home_services">
        <div className="home_service">
          <h5>Drug Demand</h5>
          <p>
            Pharmapool's Drug Demand service provides a platform for users to
            request pharmaceutical products that may be unavailable in their
            local area. We bridge the gap between demand and supply, ensuring
            that pharmacies can access the medications they need to serve their
            communities effectively.
          </p>
        </div>
        <div className="home_service">
          <h5>Joint Purchase</h5>
          <p>
            In our Joint Purchase service, multiple pharmacies can join forces
            to make bulk purchases of specific products. This collaborative
            approach allows for significant cost savings, making it a win-win
            situation for all parties involved. Pharmapool facilitates the
            coordination and sharing of bulk purchases, fostering a sense of
            unity among pharmacies.
          </p>
        </div>
        <div className="home_service">
          <h5>Sales at Discount</h5>
          <p>
            Pharmapool's Sales at Discount service enables users to sell excess
            pharmaceutical products at discounted prices. Whether you have
            surplus stock or are looking for cost-effective supplies, our
            platform connects buyers and sellers, promoting sustainable business
            practices and reducing waste.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info
