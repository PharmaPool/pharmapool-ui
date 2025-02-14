import React, { useEffect, useState } from "react";

import WalletItem from "./WalletItem";
import { useNavigate } from "react-router-dom";

function WalletList() {
  const [wallets, setWallets] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pharmapoolserver.com/api/admin/wallets", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          navigate("/admin/auth");
        }
        const walletReverse = json.wallets;
        setWallets(walletReverse);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
