import React, { useEffect, useState } from "react";

import UserItem from "./UserItem";

function UsersList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://www.pharmapoolserver.com/api/admin/users", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setUsers(json.users))
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
