import React, { useState, useEffect, useContext } from "react";

import BackHandIcon from "@mui/icons-material/BackHand";
import { useParams, useNavigate } from "react-router-dom";

import { ValueContext } from "../../Context";

function Business() {
  const [clicked, setClicked] = useState(false);
  const _id = localStorage.getItem("userId");
  const { id } = useParams();
  const { business, setBusiness, show } = useContext(ValueContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  console.log(business.interestedPartners);

  const handleGroup = () => {
    fetch(`http://127.0.0.1:8000/api/business/group/${business._id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => navigate(`/chatroom/${json.newChatRoom._id}`))
      .catch((err) => console.log(err));
  };

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
      .then((json) => setAmount(""))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/business/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setBusiness(json.business);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="biz">
      {loading && (
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
              <p>4 months ago</p>
            </div>
          </div>
          <div className="business_content">
            <h5 style={{ textAlign: "center", textTransform: "uppercase" }}>
              {business.business}
            </h5>
            <div className="business_description">
              <p>{business.content}</p>
            </div>
            <div className="product">
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
                  Not Authorized,{" "}
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
                        <button className="interest" onClick={handleInterest}>
                          submit
                        </button>
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
                        <button className="interest" onClick={handleInterest}>
                          submit
                        </button>
                      </div>
                    )}
                    <p className="end">
                      {business.interestedPartners.length} interests
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="interested_partners">
            <h4>INTERESTED PARTNERS</h4>
            <table>
              <tr>
                <th>NAME</th>
                <th>OFFER</th>
                <th></th>
              </tr>

              {business.interestedPartners.map((partner, i) => (
                <tr>
                  <td>{partner.user.fullName}</td>
                  <td>{partner.price}</td>
                  <td>
                    <button
                      className="interest"
                      onClick={() => navigate(`/profile/${partner.user._id}`)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <br />
            {!showTitle && (
              <button className="interest" onClick={() => setShowTitle(true)}>
                Create Business Group
              </button>
            )}
            {showTitle && (
              <div className="group_form">
                <input
                  type="text"
                  placeholder="Group title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="group_button">
                  <button className="interest" onClick={handleGroup}>
                    create
                  </button>
                  <button
                    className="not_interest"
                    onClick={() => setShowTitle(false)}
                  >
                    cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Business;
