import React from "react";

import SingleRequest from "./SingleRequest";

function RequestList({ content }) {
  return (
    <div className="request_list">
      {content.length > 0 &&
        content.map((request, i) => <SingleRequest key={i} request={request} />)
      }
    </div>
  );
}

export default RequestList;
