import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Emailjs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1x9z7nc",
        "template_u65v8ys",
        e.target,
        "T5W0HSzgWecgPLGmi"
      )
      .then(
        (result) => {
          setShow(!show);
          setEmail("");
          setName("");
          setCompany("");
          setPhone("");
          setMessage("");
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
          <p>Message sent Successfully!</p>
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
            <legend>Write to us now!</legend>
            <input type="hidden" name="contact_number" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="from_name"
              placeholder="Name"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              name="from_company"
              placeholder="Company (optional)"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="from_email"
              placeholder="Email"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="from_phone"
              placeholder="Phone"
            />
            <textarea
              rows={2}
              cols={5}
              name="message"
              value={message}
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="form-but">
              <button type="submit">Send Message</button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}
