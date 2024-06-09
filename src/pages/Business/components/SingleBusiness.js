import React, { useState, useContext } from "react";

import BackHandIcon from "@mui/icons-material/BackHand";
import { useNavigate } from "react-router-dom";

import { ValueContext } from "../../../Context";

function SingleBusiness({ business }) {
  const [clicked, setClicked] = useState(false);
  const [amount, setAmount] = useState("");
  const _id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { show } = useContext(ValueContext);

  const handleInterest = () => {
    setClicked(!clicked);
    fetch(`http://127.0.0.1:8000/api/business/user/${business._id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
        amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((err) => console.log(err));
  };
  return (
    <div className="business">
      <div className="business_head">
        <div
          className="user_image"
          onClick={() => navigate(`/profile/${business.creator._id}`)}
        >
          <img
            src={business.creator.profileImage.imageUrl}
            alt="username"
            width={100}
          />
        </div>
        <div className="username">
          <h5>{business.creator.fullName}</h5>
          {/* <p>4 months ago</p> */}
        </div>
      </div>
      <div
        className="business_content"
        // onClick={() => navigate(`/business/${business._id}`)}
      >
        <h5 style={{ textAlign: "center", textTransform: "uppercase" }}>
          {business.business}
        </h5>
        <div
          className="business_description"
          onClick={() => navigate(`/business/${business._id}`)}
        >
          <p>{business.content}</p>
        </div>
        <div
          className="product"
          onClick={() => navigate(`/business/${business._id}`)}
        >
          <div className="product_discription">
            <h6>Product details</h6>
            <ul>
              <li>
                Generic name: <b>{business.product.genericName}</b>
              </li>
              <li>
                Brand name: <b>{business.product.brandName}</b>
              </li>
              <li>
                Strength: <b>{business.product.strength}</b>
              </li>
              <li>
                Expiry date: <b>{business.product.expiryDate}</b>
              </li>
              <li>
                Manufacturer: <b>{business.product.manufacturer}</b>
              </li>
              <li>
                Quantity: <b>{business.product.quantity}</b>
              </li>
              <li>
                Location: <b>{business.product.locationOfPharmacy}</b>
              </li>
            </ul>
          </div>
          {business.product.productImage && (
            <div className="product_image">
              <h6>Product image</h6>
              {business.product.productImage.map((img, i) => (
                <img src={img.imageUrl} alt="product_image" key={i} />
              ))}
            </div>
          )}
        </div>
        {show ? (
          <div className="not_authorized">
            <h4>
              <a href="/signin">
                <i>Login</i>
              </a>{" "}
              to interact
            </h4>
          </div>
        ) : (
          <div>
            {business.business === "sale" && (
              <div className="demand_interactions">
                {business.interestedPartners.filter(
                  (partner) => partner.user === _id
                ).length > 0 ? (
                  <div>
                    <button
                      onClick={handleInterest}
                      className={clicked ? "interest" : "clicked_interest"}
                    >
                      Not Interested <BackHandIcon />
                    </button>
                  </div>
                ) : (
                  <div className="ints">
                    <label htmlFor="offer">I need:</label>
                    <input
                      type="text"
                      name="offer"
                      placeholder="e.g 10 boxes"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div>
                      <button className="interest" onClick={handleInterest}>
                        submit
                      </button>
                    </div>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} interested
                </p>
              </div>
            )}
            {business.business === "joint purchase" && (
              <div className="interactions">
                {business.interestedPartners.filter(
                  (partner) => partner === _id
                ).length > 0 ? (
                  <div>
                    <button className="clicked_interest">
                      Not Interested <BackHandIcon />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleInterest} className="interest">
                      Interested <BackHandIcon />
                    </button>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} interested
                </p>
              </div>
            )}
            {business.business === "demand" && (
              <div className="demand_interactions">
                {business.interestedPartners.filter(
                  (partner) => partner.user === _id
                ).length === 1 ? (
                  <div>
                    <button
                      onClick={handleInterest}
                      className="clicked_interest"
                    >
                      Not Interested <BackHandIcon />
                    </button>
                  </div>
                ) : (
                  <div className="ints">
                    <label htmlFor="offer">My offer:</label>
                    <input
                      type="text"
                      name="offer"
                      placeholder="e.g 10,000 per box"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div>
                      <button className="interest" onClick={handleInterest}>
                        submit
                      </button>
                    </div>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} interested
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleBusiness;
