import React from "react";

import Header from "../components/Header";
import SingleBusiness from "../components/SingleBusiness";

function Business() {
  return (
    <>
      <Header />
      <div className="businesses">
        <div className="business_body">
          <SingleBusiness/>
        </div>
      </div>
    </>
  );
}

export default Business;
