import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import RequestList from "./components/RequestList";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function Request() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [content, setContent] = useState([]);
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch(`https://www.pharmapoolserver.com/api/user/friend-request/${_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setContent(json.request.content));
  }, [_id, navigate, tokenChecker]);
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="requests">
        <div class="request_header">
          <h5>Friend Requests</h5>
          <div>
            <button>
              Clear all <DeleteForeverIcon />
            </button>
          </div>
        </div>
        <RequestList content={content} />
      </div>
    </>
  );
}

export default Request;
