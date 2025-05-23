import React, { useState, useEffect, useContext } from "react";

import HandshakeIcon from "@mui/icons-material/Handshake";
import Switch from "@mui/material/Switch";
import PersonIcon from "@mui/icons-material/Person";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { ValueContext } from "../../Context";
import useWindowDimensions from "../../components/useWindowDimensions";
import { jwtDecode } from "jwt-decode";
import BusinessLoader from "./components/BusinessLoader";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";

function Business() {
  const [clicked, setClicked] = useState(false);
  const _id = localStorage.getItem("userId");
  const { id } = useParams();
  const { business, setBusiness, tokenChecker } = useContext(ValueContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { width } = useWindowDimensions();

  const handleGroup = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/business/group/${business._id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
        title,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => navigate(`/chatroom/${json.newChatRoom._id}`))
      .catch((err) => console.log(err));
  };

  const handleInterest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    setClicked(!clicked);
    fetch(`http://127.0.0.1:8000/api/business/user/${business._id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
        amount,
      }),
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => setAmount(""))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
      setShow(true);
    }
    fetch(`http://127.0.0.1:8000/api/business/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setBusiness(json.business);
        setLoading(true);
        setShow(false);
        console.log(json.business);
      })
      .catch((err) => console.log(err));
  }, [id, navigate, setBusiness, tokenChecker]);
  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="biz">
        {!loading && <BusinessLoader />}
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
                {/* <p>4 months ago</p> */}
              </div>
            </div>
            <div className="business_content">
              <h5 style={{ textAlign: "center", textTransform: "uppercase" }}>
                {business.business}
              </h5>
              <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {business.content}
              </pre>
              <div className="business_deadline">
                <h5>Deadline: {business.deadline}</h5>
                <h5>
                  Closed <Switch checked={!business.status} color="success" />{" "}
                  Open
                </h5>
              </div>
              <div className="product">
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
              {show ? (
                <div className="not_authorized">
                  <h4>
                    Not Authorized,{" "}
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
                        (partner) => partner.user._id === _id
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
                        (partner) => partner.user._id === _id
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
                        (partner) => partner.user._id === _id
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
            {business.creator._id === _id && (
              <div>
                <h4 style={{ textAlign: "center" }}>INTERESTED PARTNERS</h4>
                <div class="interested_partners">
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
                            onClick={() =>
                              navigate(`/profile/${partner.user._id}`)
                            }
                          >
                            {width > 1000 ? "View Profile" : <PersonIcon />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
                <br />
                {business.creator._id === _id && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!showTitle && (
                      <div className="interestedPartners_button">
                        <button
                          className="interest"
                          onClick={() => setShowTitle(true)}
                          style={{ textAlign: "center" }}
                        >
                          Create Business Group
                        </button>
                        {/* <button
                      className="interest"
                      onClick={() => setShowTitle(true)}
                    >
                      <MapIcon /> View Map
                    </button> */}
                      </div>
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
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Business;
