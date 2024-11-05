import React from "react";
import "./index.css";

import AdminHeader from "../components/AdminHeader";
import WalletDetails from "./components/WalletDetails";
import WalletList from "./components/WalletList";

function Wallets() {
  return (
    <>
      <AdminHeader />
      <div className="admin_wallets">
        <WalletList />
        <WalletDetails />
      </div>
    </>
  );
}

export default Wallets;
