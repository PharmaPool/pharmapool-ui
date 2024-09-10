import React, { useEffect, useState } from "react";

import WalletItem from "./WalletItem";

function WalletList() {
  const [wallets, setWallets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://www.pharmapoolserver.com/api/admin/wallets", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setWallets(json.wallets))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {" "}
      <h5>Users</h5>
      <div className="users_list">
        <div class="users_list_items">
          {wallets.map((wallet, i) => (
            <WalletItem wallet={wallet} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default WalletList;
