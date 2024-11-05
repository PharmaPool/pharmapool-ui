import React, { useContext, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

import { ValueContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

function InventoryList({ inventories, id }) {
  const { product, setProduct } = useContext(ValueContext);
  const navigate = useNavigate();
  return (
    <div className="inventory_list">
      <div>
        <h4 style={{ textAlign: "center" }}>Available Products</h4>
        <div className="interested_partners">
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity available</th>
              <th></th>
            </tr>
            {inventories.map((invent, i) => (
              <tr key={i}>
                <td>{invent.product}</td>
                <td>{invent.total} cartons</td>
                <td>
                  <button
                    className="interest"
                    onClick={() =>
                      navigate(`/admin/inventory/${invent._id}`)
                    }
                  >
                    Inventory
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
