import React, { useState, useContext } from "react";

import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate, useLocation } from "react-router-dom";

import { ValueContext } from "../../../Context";

function SingleBusiness({ business, loggedIn }) {
  const [clicked, setClicked] = useState(false);
  const [amount, setAmount] = useState("");
  const _id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenChecker } = useContext(ValueContext);
 
  const handleInterest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    setClicked(!clicked);
    fetch(
      `https://www.pharmapoolserver.com/api/business/user/${business._id}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: _id,
          amount,
        }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
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
          className="business_deadline"
          onClick={() => navigate(`/business/${business._id}`)}
        >
          <h5>Deadline: {business.deadline}</h5>
        </div>
        <div
          className="product"
          onClick={() => navigate(`/business/${business._id}`)}
        >
          <div className="product_description">
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
              <h6 style={{ paddingLeft: "1rem" }}>Product image</h6>
              {business.product.productImage.map((img, i) => (
                <img src={img.imageUrl} alt="product_image" key={i} />
              ))}
            </div>
          )}
        </div>
        {!loggedIn ? (
          <div className="not_authorized">
            <h4>
              Not Authorized,
              <a href="/verify/signin?redirectTo=/private_business">
                <i>Login</i>
              </a>{" "}
              to interact
            </h4>
          </div>
        ) : (
          <div>
            {business.business === "sale" && (
              <div className="demand_interactions">
                {business.interestedPartners.find(
                  (partner) => partner.user === _id
                ) ? (
                  <div>
                    <button onClick={handleInterest} className="interest">
                      Partner <HandshakeIcon />
                    </button>
                  </div>
                ) : (
                  <div className="ints">
                    <div>
                      <label htmlFor="offer">I need:</label>
                      <input
                        type="text"
                        name="offer"
                        placeholder="e.g 10 boxes"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <button className="interest" onClick={handleInterest}>
                      submit
                    </button>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} partners
                </p>
              </div>
            )}
            {business.business === "joint purchase" && (
              <div className="interactions">
                {business.interestedPartners.find(
                  (partner) => partner.user === _id
                ) ? (
                  <div>
                    <button className="interest">
                      Partner <HandshakeIcon />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleInterest} className="interest">
                      Become partner <HandshakeIcon />
                    </button>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} partners
                </p>
              </div>
            )}
            {business.business === "demand" && (
              <div className="demand_interactions">
                {business.interestedPartners.find(
                  (partner) => partner.user === _id
                ) ? (
                  <div>
                    <button onClick={handleInterest} className="interest">
                      Partner <HandshakeIcon />
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
                    <button className="interest" onClick={handleInterest}>
                      submit
                    </button>
                  </div>
                )}
                <p className="end">
                  {business.interestedPartners.length} partners
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
