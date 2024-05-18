import React, { useContext } from "react";

import Post from "../../Post/components/Post";
import SingleBusiness from "../../Business/components/SingleBusiness";

import { ValueContext } from "../../../Context";

function ProfileBody({ posts, businesses, id }) {
  const { post, businessTab } = useContext(ValueContext);
  return (
    <div className="profile_body">
      {post && posts.map((post, i) => <Post post={post} key={i} />)}
      {businessTab &&
        businesses.map((biz, i) => {
          if (biz.creator._id.toString() === id.toString()) {
            return <SingleBusiness business={biz} key={i} />;
          }
        })}
    </div>
  );
}

export default ProfileBody;
