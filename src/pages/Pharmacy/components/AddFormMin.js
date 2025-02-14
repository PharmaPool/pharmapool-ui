import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from "../../../Context";

function AddFormMin({ id }) {
  const { setAdd, pharmacy } = useContext(ValueContext);
  const [brand, setBrand] = useState("");
  const [strength, setStrength] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [dateIn, setDateIn] = useState(Date);
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = () => {
    fetch(
      `https://pharmapoolserver.com/api/business/inventory/addstock/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          brand,
          strength,
          manufacturer,
          dateIn,
          expiryDate,
          quantity,
          pharmacyId: pharmacy._id,
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
      <div className="interested_partners">
        <table className="addform">
          <tr>
            <th>Brand</th>
            <td>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Strength</th>
            <td>
              <input
                type="number"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>manufacturer</th>
            <td>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Date in</th>
            <td>
              <input
                type="date"
                value={dateIn}
                onChange={(e) => setDateIn(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>expiry date</th>
            <td>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>quantity</th>
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
          <button className="not_interest" onClick={() => setAdd()}>
            <CancelIcon /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFormMin;
