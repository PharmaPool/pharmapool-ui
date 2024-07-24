import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from "../../../Context";

function AddForm({ id }) {
  const { setAdd } = useContext(ValueContext);
  const [brand, setBrand] = useState("");
  const [strength, setStrength] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [dateIn, setDateIn] = useState(Date);
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token")

  const handleSubmit = () => {
    fetch(`http://127.0.0.1:8000/api/business/inventory/addstock/${id}`, {
      method: "POST",
      body: JSON.stringify({
        brand,
        strength,
        manufacturer,
        dateIn,
        expiryDate,
        quantity,
      }),
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="inventory_list">
      <div className="interested_partners">
        <table className="addform">
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
                type="number"
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
      <div className="add_product">
        <button className="clicked_interest" onClick={handleSubmit}>
          <AddIcon /> Add
        </button>
        <button className="interest" onClick={() => setAdd()}>
          <CancelIcon /> Cancel
        </button>
      </div>
    </div>
  );
}

export default AddForm;
