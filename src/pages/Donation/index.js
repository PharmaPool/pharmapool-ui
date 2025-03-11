import React, { useState } from "react";
import "./Donation.css";
import logo from "../../data/logo.png";
import Paystack from "@paystack/inline-js";

function Donation() {
  const popup = new Paystack();
  const [donation, setDonation] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
  };

  const handle_wallet_request = () => {
    setLoading(true);
    setThankYouMessage("");
    fetch(`http://127.0.0.1:8000/api/donor/register`, {
      method: "POST",
      body: JSON.stringify({
        name: donation.name,
        email: donation.email,
        phone: donation.phone,
        amount: Number(donation.amount),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          fetch(
            `http://127.0.0.1:8000/api/donor/donate/${json.wallet.walletAddress}`,
            {
              method: "POST",
              body: JSON.stringify({
                email: donation.email,
                amount: donation.amount,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((json) => {
              popup.resumeTransaction(json.result.data.access_code);
              setLoading(false);
              setThankYouMessage("Thank you for your generous donation!");
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          setDonation({
            name: "",
            email: "",
            phone: "",
            amount: "",
          });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="donations">
      <div className="donations_logo">
        <img src={logo} alt="" />
      </div>
      <h2>Donations</h2>
      <p>
        Your donation will help us to continue to provide free and open access
        to our data and tools. Your support will also enable us expand our
        network of medicine suppliers and facilitate our timely interventions to
        save lives. We are grateful for your support.
      </p>
      <div className="donations_form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />
        <button onClick={handle_wallet_request} disabled={loading}>
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>
      {thankYouMessage && <p className="thank-you">{thankYouMessage}</p>}
    </div>
  );
}

export default Donation;
