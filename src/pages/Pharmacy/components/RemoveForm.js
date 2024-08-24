import React, { useContext, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from "../../../Context";

function RemoveForm({ id, invent }) {
  const { setRemove, pharmacy } = useContext(ValueContext);
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("token");
  const handleRemove = () => {
    fetch(
      `https://www.pharmapoolserver.com/api/business/inventory/removestock/${id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </td>
        </tr>
      </table>
      <div className="add_product">
        <button className="interest" onClick={handleRemove}>
          <RemoveIcon /> Sell
        </button>
        <button className="not_interest" onClick={() => setRemove()}>
          <CancelIcon /> Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveForm;
