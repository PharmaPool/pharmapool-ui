import React, { useState } from "react";
import "../index.css";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

function SingleBusiness({ business }) {
  const [approval, setApproval] = useState(false);
  const [open, setOpen] = useState(false);
  const [delet, setDelet] = useState(false);
  const [close, setClose] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const deleteApproval = () => {
    deleteBusiness();
  };

  const closeApproval = () => {
    closeBusiness();
  };

  const deleteBusiness = async () => {
    fetch(`http://127.0.0.1:8000/api/admin/business/${business._id}`, {
      method: "DELETE",
      body: JSON.stringify({
        _id: business.creator._id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) =>
        json.success ? window.location.reload() : navigate("/admin/auth")
      );
  };

  const closeBusiness = () => {
    fetch(`http://127.0.0.1:8000/api/admin/business/${business._id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) =>
        json.success ? window.location.reload() : navigate("/admin/auth")
      );
  };
  return (
    <div className="business">
      {!open && (
        <div class="admin_single_business_delete">
          <button
            className="not_interest"
            onClick={() => {
              setOpen(true);
              setDelet(true);
            }}
          >
            Delete business
          </button>
          <button
            className="interest"
            onClick={() => {
              setOpen(true);
              setClose(true);
            }}
          >
            Close business
          </button>
        </div>
      )}
      {open && delet && (
        <div class="admin_single_business_delete">
          <button
            className="not_interest"
            onClick={() => {
              setOpen(false);
              setDelet(false);
            }}
          >
            No
          </button>
          <button className="interest" onClick={deleteApproval}>
            Yes
          </button>
          <p>Delete business?</p>
        </div>
      )}
      {open && close && (
        <div class="admin_single_business_delete">
          <button
            className="not_interest"
            onClick={() => {
              setOpen(false);
              setClose(false);
            }}
          >
            No
          </button>
          <button className="interest" onClick={closeApproval}>
            Yes
          </button>
          <p>Close business?</p>
        </div>
      )}
      <div className="business_head">
        <div className="user_image">
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
        <div className="business_description">
          <p>{business.content}</p>
        </div>
        <div className="business_deadline">
          <h5>Deadline: {business.deadline}</h5>
          <h5>
            Closed <Switch checked={!business.status} color="success" /> Open
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
        <div>
          {business.business === "sale" && (
            <div className="demand_interactions">
              {business.interestedPartnerss ? (
                <div>
                  <button className="interest">
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
                    />
                  </div>
                  <button className="interest">submit</button>
                </div>
              )}
              <p className="end">
                {business.interestedPartners.length} partners
              </p>
            </div>
          )}
          {business.business === "joint purchase" && (
            <div className="interactions">
              {business.interestedPartners ? (
                <div>
                  <button className="interest">
                    Partner <HandshakeIcon />
                  </button>
                </div>
              ) : (
                <div>
                  <button className="interest">
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
              {business.interestedPartners ? (
                <div>
                  <button className="interest">
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
                  />
                  <button className="interest">submit</button>
                </div>
              )}
              <p className="end">
                {business.interestedPartners.length} partners
              </p>
            </div>
          )}
        </div>
        <div style={{ marginTop: "2rem" }}>
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
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBusiness;
