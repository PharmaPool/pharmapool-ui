import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function MedicineRequest() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sickness, setSickness] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1x9z7nc",
        "template_shf4b4p",
        e.target,
        "T5W0HSzgWecgPLGmi"
      )
      .then(
        (result) => {
          setShow(!show);
          setBrand("");
          setQuantity("");
          setName("");
          setSickness("");
          setLocation("");
          setEmail("");
          setPhone("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div>
      {show ? (
        <div className="success">
          <p>Request sent Successfully!</p>
          <span
            onClick={() => setShow(!show)}
            style={{ cursor: "pointer", fontWeight: "bolder" }}
          >
            x
          </span>
        </div>
      ) : (
        <form className="home_form" onSubmit={sendEmail}>
          <fieldset>
            <legend>Make a request for your medicine now!</legend>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              name="brand"
              placeholder="Medicine brand name"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Drug general name"
            />
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              name="quantity"
              placeholder="Quantity required"
            />
            <input
              type="text"
              value={sickness}
              onChange={(e) => setSickness(e.target.value)}
              name="sickness"
              placeholder="Type of sickness"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="brand"
              placeholder="Location"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="from_phone"
              placeholder="Phone number"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="from_email"
              placeholder="Email"
            />
            <div className="form-but">
              <button type="submit">Send Request</button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
