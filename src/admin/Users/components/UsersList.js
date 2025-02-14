import React, { useEffect, useState } from "react";

import UserItem from "./UserItem";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pharmapoolserver.com/api/admin/users", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) =>
        json.error ? navigate("/admin/auth") : setUsers(json.users)
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {" "}
      <h5>Users</h5>
      <div className="users_list">
        <div class="users_list_items">
          {users.map((user, i) => (
            <UserItem user={user} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default UsersList;
