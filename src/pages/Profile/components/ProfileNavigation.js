import React, { useContext } from "react";

import { ValueContext } from "../../../Context";

function ProfileNavigation() {
  const { post, businessTab, setPost, setBusinessTab } =
    useContext(ValueContext);

  return (
    <div className="profile_navigation">
      <div>
        <button
          className={post ? "profile_button_select" : "profile_button"}
          onClick={() => setPost()}
        >
          Posts
        </button>
      </div>
      <div>
        <button
          className={businessTab ? "profile_button_select" : "profile_button"}
          onClick={() => setBusinessTab()}
        >
          Businesses
        </button>
      </div>
    </div>
  );
}

export default ProfileNavigation;
