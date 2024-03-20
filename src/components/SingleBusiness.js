import React from "react";

import Logo from "../data/logo.png";

function Business() {
  return (
    <div className="business">
      <div className="business_head">
        <div className="user_image">
          <img src={Logo} alt="username" width={100} />
        </div>
        <div className="username">
          <h5>Wilson Zimthamaha Bonkuru</h5>
          <p>4 months ago</p>
        </div>
      </div>
      <div className="business_content">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          ducimus, eveniet laborum temporibus autem nesciunt ex omnis quam
          facilis blanditiis!
        </p>
        <div className="product">
          <div className="product_discription">
            <h6>Product details</h6>
            <ul>
              <li>
                Generic name: <b>Misoprostol</b>
              </li>
              <li>
                Brand name: <b>Misofem</b>
              </li>
              <li>
                Strength: <b>500mg</b>
              </li>
              <li>
                Expiry date: <b>16th March, 2025</b>
              </li>
              <li>
                Manufacturer: <b>Emzor</b>
              </li>
              <li>
                Quantity: <b>50 boxes</b>
              </li>
              <li>
                Location: <b>Jimeta, Adamawa</b>
              </li>
            </ul>
          </div>
          <div className="product_image">
            <h6>Product image</h6>
            <img src={Logo} alt="product_image" width={200} />
          </div>
        </div>
        <div className="interactions">
          <p>100 interactions</p>
          <input type="checkbox" name="interest" id="interest" />
          <label htmlFor="interest">Declare interest</label>
        </div>
      </div>
    </div>
  );
}

export default Business;
