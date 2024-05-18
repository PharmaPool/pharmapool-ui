import React, {useContext} from 'react'
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

import { ValueContext } from '../../../Context';

function RemoveForm() {
  const {setRemove} = useContext(ValueContext)
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
          <td>M & B</td>
          <td>500mg</td>
          <td>m & b</td>
          <td>may, 2024</td>
          <td>november, 2026</td>
          <td>
            <input type="number" />
          </td>
        </tr>
        <tr>
          <td>M & B</td>
          <td>500mg</td>
          <td>m & b</td>
          <td>may, 2024</td>
          <td>november, 2026</td>
          <td>
            <input type="number" />
          </td>
        </tr>
      </table>
      <div className="add_product">
        <button className="interest">
          <RemoveIcon /> Remove
        </button>
        <button className="clicked_interest" onClick={()=>setRemove()}>
          <CancelIcon /> Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveForm
