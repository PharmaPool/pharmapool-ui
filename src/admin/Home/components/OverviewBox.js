import React from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useNavigate } from "react-router-dom";

function OverviewBox({ title, value, target, url }) {
  const navigate = useNavigate();
  return (
    <div className="overview_box" onClick={() => navigate(url)}>
      <h3>{title}</h3>
      <div class="overview_box_piechart">
        <PieChart
          data={[
            { title: title, value: value, color: "#d7ccc8" },
            { title: "Target", value: target - value, color: "#004d40" },
          ]}
        />
      </div>
      <div class="overview_box_body">
        <ul>
          <li>
            Total {title}: <b>{value}</b>
          </li>
          <li>
            Target: <b>{target}</b>
          </li>
          <li>
            Percentage: <b>{Number((value / target) * 100).toFixed(1)}%</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OverviewBox;
