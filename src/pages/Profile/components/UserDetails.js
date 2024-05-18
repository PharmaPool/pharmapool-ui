import React from "react";

import DetailsModal from "./DetailsModal"

function UserDetails({ details }) {
  return (
    <div className="profile_details">
      <p>
        <b>Email: </b> {details.email} <DetailsModal />
      </p>
      <p className="p">
        <b>Phone: </b> {details.phoneNumber} <DetailsModal />
      </p>
      <p className="p">
        <b>Address: </b> {details.address} <DetailsModal />
      </p>
      <p className="p">
        <b>State: </b> {details.state} state <DetailsModal />
      </p>
    </div>
  );
}

export default UserDetails;
