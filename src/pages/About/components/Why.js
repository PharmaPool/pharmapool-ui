import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function Why() {
  return (
    <div>
      <h4>Why choose Pharmapool?</h4>
      <div className="strengths">
        <div className="strength">
          <LightbulbCircleIcon style={{ fontSize: "5rem", color: "#004d40" }} />
          <h5>Efficiency</h5>
          <p>
            Pharmapool streamlines the procurement process, saving time and
            resources for pharmacies and pharmacists.
          </p>
        </div>
        <div className="strength">
          <AccountBalanceIcon style={{ fontSize: "5rem", color: "#004d40" }} />
          <h5>Costs Savings</h5>
          <p>
            Our Joint Purchase and Sales at Discount services provide
            opportunities for significant cost savings, promoting financial
            sustainability.
          </p>
        </div>
        <div className="strength">
          <PeopleIcon style={{ fontSize: "5rem", color: "#004d40" }} />
          <h5>Community Building</h5>
          <p>
            Pharmapool fosters a sense of community within the pharmaceutical
            industry, encouraging collaboration and mutual support.
          </p>
        </div>
        <div className="strength">
          <SyncLockIcon style={{ fontSize: "5rem", color: "#004d40" }} />
          <h5>Secure Payment System</h5>
          <p>
            Pharmapool prioritizes the security of financial transactions on our
            platform. With a robust and reliable payment system, we ensure that
            all monetary transactions taking place within our ecosystem are
            managed securely, providing peace of mind to our users.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Why;
