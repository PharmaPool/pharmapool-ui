import React, { useState, useEffect } from "react";
import "./index.css";

import images from "../../data/images";

import OverviewBox from "./components/OverviewBox";

function Home() {
  const [users, setUsers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [businesses, setBusinesses] = useState(0);
  const [inventories, setInventories] = useState(0);
  const [pharmacies, setPharmacies] = useState(0);
  const [transactions, setTransaction] = useState(0);
  const [wallets, setWallets] = useState(0);
  const [target, setTarget] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTarget(100);
    fetch("https://www.pharmapoolserver.com/api/admin/users", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setUsers(json.users.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/posts", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setPosts(json.posts.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/business", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setBusinesses(json.businesses.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/wallets", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setWallets(json.wallets.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/transactions", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setTransaction(json.allTransactions.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/pharmacies", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setPharmacies(json.pharmacies.length))
      .catch((err) => console.log(err));

    fetch("https://www.pharmapoolserver.com/api/admin/inventories", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setInventories(json.inventories.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="admin_home">
      <div class="admin_home_banner">
        <div class="admin_home_banner_img">
          <img src={images.logo} alt="pharmapool_logo" />
        </div>
        <h1>Pharmapool Synergy Solutions Nigeria Limited</h1>
        <h3>Admin</h3>
      </div>
      <div class="admin_home_body">
        <OverviewBox
          title={"Users"}
          value={users}
          target={target}
          url={"/admin/users"}
        />
        <OverviewBox
          title={"Businesses"}
          value={businesses}
          target={target}
          url={"/admin/businesses"}
        />
        <OverviewBox
          title={"Wallets"}
          value={wallets}
          target={target}
          url={"/admin/wallets"}
        />
        {/* <OverviewBox
          title={"Pharmacies"}
          value={pharmacies}
          target={target}
          url={"/admin/pharmacies"}
        />
        <OverviewBox
          title={"Inventories"}
          value={inventories}
          target={target}
          url={"/admin/inventories"}
        />
        <OverviewBox
          title={"Transactions"}
          value={transactions}
          target={target}
          url={"/admin/transactions"}
        />
        <OverviewBox
          title={"Posts"}
          value={posts}
          target={target}
          url={"/admin/posts"}
        /> */}
      </div>
    </div>
  );
}

export default Home;
