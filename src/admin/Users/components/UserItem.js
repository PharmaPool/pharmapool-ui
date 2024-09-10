import React, { useContext } from "react";
import { ValueContext } from "../../../Context";

function UserItem({ user }) {
  const { setAdminUserId } = useContext(ValueContext);
  return (
    <div className="user_item" onClick={() => setAdminUserId(user._id)}>
      <div class="user_item_profile_img">
        <img src={user.profileImage.imageUrl} alt="" />
      </div>
      <p>{user.fullName}</p>
    </div>
  );
}

export default UserItem;
