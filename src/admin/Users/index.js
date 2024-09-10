import React from "react";
import "./index.css";

import AdminHeader from "../components/AdminHeader";
import UserDetails from "./components/UserDetails";
import UsersList from "./components/UsersList";

function Users() {
  return (
    <>
      <AdminHeader />
      <div className="admin_users">
        <UsersList />
        <UserDetails />
      </div>
    </>
  );
}

export default Users;
