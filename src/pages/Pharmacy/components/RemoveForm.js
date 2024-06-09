import React, { useContext, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from "../../../Context";

function RemoveForm({ id, invent }) {
  const { setRemove } = useContext(ValueContext);
  const [quantity, setQuantity] = useState(0);
  const handleRemove = () => {
    fetch(`http://127.0.0.1:8000/api/business/inventory/removestock/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
          <RemoveIcon /> Remove
        </button>
        <button className="clicked_interest" onClick={() => setRemove()}>
          <CancelIcon /> Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveForm;
