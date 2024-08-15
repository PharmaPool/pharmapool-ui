import React, { useContext, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

import AddProductWide from "./AddProductWide";
import AddProductMin from "./AddProductMin";

import { ValueContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../../components/useWindowDimensions";

function InventoryList({ inventories, id }) {
  const { product, setProduct } = useContext(ValueContext);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
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
                      navigate(`/pharmacy/${invent._id}/inventory`)
                    }
                  >
                    Inventory
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="table_below">
          {product && width > 900 ? <AddProductWide id={id} /> : ""}
          {product && width < 1000 ? <AddProductMin id={id} /> : ""}
          <div className="add_product">
            <button
              className="interest"
              onClick={() => {
                setProduct();
              }}
            >
              <AddIcon /> Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
