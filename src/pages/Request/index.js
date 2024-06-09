import React, { useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import RequestList from "./components/RequestList";

import useWindowDimensions from "../../components/useWindowDimensions";

function Request() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [content, setContent] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/friend-request/${_id}`)
      .then((res) => res.json())
      .then((json) => setContent(json.request.content));
  }, []);
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="requests">
        <h4>Friend Requests</h4>
        <RequestList content={content} />
      </div>
    </>
  );
}

export default Request;
