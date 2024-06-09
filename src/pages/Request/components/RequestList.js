import React from "react";

import SingleRequest from "./SingleRequest";

function RequestList({ content }) {
  return (
    <div className="request_list">
      {content.length < 1 ? (
        <div>
          <h3>No request yet</h3>
        </div>
      ) : (
        <SingleRequest />
      )}
    </div>
  );
}

export default RequestList;
