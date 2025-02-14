import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from "../../../Context";

function AddProductWide({ id }) {
  const { setProduct } = useContext(ValueContext);
  const [products, setProducts] = useState("");
  const [brand, setBrand] = useState("");
  const [strength, setStrength] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    fetch(
      `https://pharmapoolserver.com/api/business/inventory/addproduct/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          product: products,
          brand,
          strength,
          manufacturer,
          dateIn,
          expiryDate,
          quantity,
        }),
        headers: { Authorization: token, "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((json) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="inventory_list">
      <div className="product_name">
        <input
          type="text"
          placeholder="Name of product"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
          autoFocus={true}
        />
      </div>
      <div className="interested_partners">
        <table>
          <tr>
            <th>Brand</th>
            <th>Strength</th>
            <th>manufacturer</th>
            <th>Date in</th>
            <th>expiry date</th>
            <th>quantity</th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                value={dateIn}
                onChange={(e) => setDateIn(e.target.value)}
              />
            </td>
            <td>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="table_below">
        <div className="add_product">
          <button className="interest" onClick={handleSubmit}>
            <AddIcon /> Add
          </button>
          <button className="not_interest" onClick={() => setProduct()}>
            <CancelIcon /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductWide;
