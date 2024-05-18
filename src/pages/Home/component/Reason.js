import React from "react";

import PeopleIcon from "@mui/icons-material/People";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function Reason() {
  return (
    <div className="home_reason">
      <h2>At Pharmapool we ensure...</h2>
      <div className="reasons">
        <div className="reason">
          <SyncLockIcon style={{ fontSize: "5rem", color: "#fff" }} />
          <h5>Secure Payment</h5>
        </div>
        <div className="reason">
          <LightbulbCircleIcon style={{ fontSize: "5rem", color: "#fff" }} />
          <h5>Efficiency</h5>
        </div>
        <div className="reason">
          <AccountBalanceIcon style={{ fontSize: "5rem", color: "#fff" }} />
          <h5>Costs Savings</h5>
        </div>
        <div className="reason">
          <PeopleIcon style={{ fontSize: "5rem", color: "#fff" }} />
          <h5>Community Building</h5>
        </div>
      </div>
    </div>
  );
}

export default Reason;
