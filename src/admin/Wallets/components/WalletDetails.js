import React, { useState, useEffect, useContext } from "react";

import { ValueContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

function WalletDetails() {
  const { adminWalletId } = useContext(ValueContext);
  const token = localStorage.getItem("token");
  const [wallet, setWallet] = useState({});
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const navigate = useNavigate();

  console.log(adminWalletId);

  useEffect(() => {
    if (adminWalletId !== "") {
      fetch(`https://pharmapoolserver.com/api/admin/wallet/${adminWalletId}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            navigate("/admin/auth");
          }
          setSupplier(json.wallet.supplier);
          setPaymentComplete(json.wallet.paymentComplete);
          setWallet(json.wallet);
        })
        .catch((err) => console.log(err));
    }
  }, [adminWalletId]);

  return (
    <div className="wallet_details">
      {wallet._id !== undefined ? (
        <div className="account_body">
          <p>Wallet address: {wallet.walletAddress}</p>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            N<h1>{Number(wallet.balance).toFixed(2)}</h1>K
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <p>
              Total amount: N
              <span style={{ fontWeight: "bold" }}>{wallet.amount}</span>
            </p>
            <p>
              Total quantity of supply:
              <span style={{ fontWeight: "bold", marginLeft: "0.2rem" }}>
                {wallet.quantity}
              </span>
            </p>
            <p>
              Unit price of supply: N
              <span style={{ fontWeight: "bold" }}>{wallet.unitPrice}</span>
            </p>
            <p>
              Supplier:
              <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {/* {wallet.supplier.user.fullName} */}
              </span>
            </p>
          </div>

          {paymentComplete ? (
            <div className="interested_partners">
              <table className="account_table">
                <tr>
                  <th>Partner</th>
                  <th>Receipt</th>
                </tr>
                <tr>
                  <td>{supplier.user.fullName}</td>
                  {supplier.receipt === true && (
                    <td style={{ color: "#004d40", fontWeight: "bold" }}>
                      success
                    </td>
                  )}
                  {supplier.receipt === false && (
                    <td style={{ color: "orange", fontWeight: "bold" }}>
                      pending...
                    </td>
                  )}
                </tr>
                {wallet.referenceCodes.map((user) => (
                  <tr>
                    <td>{user.user.fullName}</td>
                    {user.receipt === true && (
                      <td style={{ color: "#004d40", fontWeight: "bold" }}>
                        success
                      </td>
                    )}
                    {user.receipt === false && (
                      <td style={{ color: "orange", fontWeight: "bold" }}>
                        pending...
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <div className="interested_partners">
              <table className="account_table">
                <tr>
                  <th>Partner</th>
                  <th>Quantity</th>
                  <th>Payment status</th>
                </tr>
                {wallet.referenceCodes.map((user) => (
                  <tr>
                    <td>{user.user.fullName}</td>
                    <td>{user.quantity}</td>
                    {user.paymentStatus === true && (
                      <td style={{ color: "#004d40", fontWeight: "bold" }}>
                        success
                      </td>
                    )}
                    {user.paymentStatus === false && (
                      <td style={{ color: "orange", fontWeight: "bold" }}>
                        pending...
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="user_details"></div>
      )}
    </div>
  );
}

export default WalletDetails;
