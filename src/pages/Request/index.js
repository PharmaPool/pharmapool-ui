import React from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import RequestList from "./components/RequestList";

import useWindowDimensions from "../../components/useWindowDimensions";

function Request() {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="requests">
        <h4>Friend Requests</h4>
        <RequestList />
      </div>
    </>
  );
}

export default Request;
