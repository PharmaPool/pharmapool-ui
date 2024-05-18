import React from "react";

function Details({ details }) {
  return (
    <div className="profile_details">
      <p className="p">
        <b>Address: </b> {details.address}
      </p>
      <p className="p">
        <b>State: </b> {details.state} state
      </p>
    </div>
  );
}

export default Details;
