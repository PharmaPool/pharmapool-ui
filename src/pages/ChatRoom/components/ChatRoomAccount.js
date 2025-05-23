import * as React from "react";
import { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { ValueContext } from "../../../Context";
import { useNavigate, useLocation } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import SpinLoader from "../../../components/SpinLoader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ChatRoomAccount({ id }) {
  const popup = new Paystack();
  const [open, setOpen] = useState(false);
  const { tokenChecker } = useContext(ValueContext);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [paidAgain, setPaidAgain] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [wallet, setWallet] = useState({});
  const [partners, setPartners] = useState("");
  const [required, setRequired] = useState(false);
  const [load, setLoad] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const [acctType, setAcctType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/wallet/chatroom/${id}`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.chatroom.wallet) {
          setShow(false);
          return;
        } else {
          setShow(true);
        }
        setSupplier(json.wallet.supplier);
        setPaymentComplete(json.wallet.paymentComplete);
        setWallet(json.wallet);
        setPartners(json.wallet.partners);
        const paid_user_verified = json.wallet.referenceCodes.filter(
          (user) => user.user._id === userId && user.paymentStatus === true
        );
        const paid_user_unverified = json.wallet.referenceCodes.filter(
          (user) => user.user._id === userId && user.paymentStatus === false
        );
        if (paid_user_verified.length > 0) {
          setPaid(true);
          setPaidAgain(false);
          setVerified(true);
        }
        if (paid_user_unverified.length > 0) {
          setVerified(false);
        }
      })
      .catch((err) => console.log(err));
  }, [tokenChecker, navigate, id]);

  const handleAmount = (e) => {
    const requested_amount = e.target.value;
    const amount_to_pay = Number(requested_amount) * quantity;
    const total = amount_to_pay * 0.035 + amount_to_pay;
    setAmount(total);
    setUnitPrice(requested_amount);
  };

  const handle_wallet_request = () => {
    setLoad(true);
    const token = tokenChecker();
    if (amount < 1) {
      setRequired(true);
      return;
    }
    if (!token) {
      navigate(`/signin`);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/wallet/chatroom/${id}`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        quantity,
        unitPrice,
      }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setLoad(false);
        setShow(true);
        setSupplier(json.wallet.supplier);
        setPaymentComplete(json.wallet.paymentComplete);
        setWallet(json.wallet);
        setPartners(json.wallet.partners);
      })
      .catch((err) => console.log(err));
  };

  const handle_payment = () => {
    setLoad(true);
    setVerificationError(false);

    const token = tokenChecker();
    if (!token) {
      navigate(`/signin`);
      return;
    }

    const partners_amount = Number(wallet.unitPrice) * Number(quantity);
    const partner_amount = partners_amount * 0.035 + partners_amount;
    localStorage.setItem("amount", partner_amount.toString());

    fetch(
      `http://127.0.0.1:8000/api/wallet/payment/accept/${wallet.walletAddress}`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: partner_amount,
          quantity,
        }),
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setWallet(json.wallet);
        setSupplier(json.wallet.supplier);
        const paid_user = json.wallet.referenceCodes.filter(
          (user) => user.user === userId
        );
        if (paid_user.length > 0) {
          setLoad(false);
          setPaid(true);
          setPaidAgain(true);
          localStorage.setItem("reference", paid_user[0].reference);
          popup.resumeTransaction(json.result.data.access_code);
        }
        if (paid_user[0].paymentStatus) {
          setLoad(false);
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const verify_payment = () => {
    setLoad(true);
    const reference = localStorage.getItem("reference");
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    const paid_amount = localStorage.getItem("amount");

    fetch(
      `http://127.0.0.1:8000/api/wallet/payment/verify/chatroom/${wallet.walletAddress}`,
      {
        method: "POST",
        body: JSON.stringify({
          reference,
          chatroomId: id,
          amount: Number(paid_amount),
        }),
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.success === false) {
          setLoad(false);
          setVerificationError(true);
          setVerified(true);
          setPaid(true);
          setPaidAgain(false);
          setPaymentComplete(json.wallet.paymentComplete);
          setWallet(json.wallet);
          return;
        }
        setPaymentComplete(json.wallet.paymentComplete);
        setWallet(json.wallet);
        setPartners(json.wallet.partners);
        setSupplier(json.wallet.supplier);
        const paid_user = json.wallet.referenceCodes.filter(
          (user) => user.user._id === userId
        );
        if (paid_user.length > 0) {
          setLoad(false);
          setPaid(true);
          setPaidAgain(false);
        }
        if (paid_user[0].paymentStatus) {
          setLoad(false);
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const acknowledge_receipt = () => {
    setLoad(true);
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=/chatroom`);
      return;
    }

    if (supplier.user._id === userId) {
      setAcctType("supplier");
    } else {
      setAcctType("partner");
    }

    fetch(`http://127.0.0.1:8000/api/wallet/receipt/acknowledge/chatroom`, {
      method: "POST",
      body: JSON.stringify({
        chatroomId: id,
        acctType,
      }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setLoad(false);
        setPaymentComplete(json.wallet.paymentComplete);
        setWallet(json.wallet);
        setSupplier(json.wallet.supplier);
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        business wallet
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chatroom wallet details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {show ? (
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
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {wallet.supplier.user.fullName}
                  </span>
                </p>
              </div>
              {!verified && !paymentComplete && (
                <div style={{ margin: "1rem 0px" }}>
                  {paid ? (
                    <button
                      className="new_chatroom_button"
                      onClick={verify_payment}
                    >
                      {load ? <SpinLoader color={true} /> : "Verify payment"}
                    </button>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p>Type your agreed quantity</p>
                      <div class="wallet_form">
                        <input
                          type="number"
                          placeholder="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <button
                        className="new_chatroom_button"
                        onClick={handle_payment}
                      >
                        {load ? <SpinLoader color={true} /> : "Pay now"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {verificationError && (
                <p style={{ color: "red" }}>
                  Payment was unsuccessful. Please try again or contact
                  Pharmapool for verification.
                </p>
              )}

              {verified && !paymentComplete && (
                <div style={{ margin: "1rem 0px" }}>
                  {paidAgain ? (
                    <button
                      className="new_chatroom_button"
                      onClick={verify_payment}
                    >
                      {load ? <SpinLoader color={true} /> : "Verify payment"}
                    </button>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p>Type your agreed quantity</p>
                      <div class="wallet_form">
                        <input
                          type="number"
                          placeholder="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <button
                        className="new_chatroom_button"
                        onClick={handle_payment}
                      >
                        {load ? <SpinLoader color={true} /> : "Pay again"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {verified && paymentComplete && (
                <div style={{ margin: "1rem 0px" }}>
                  <button
                    className="new_chatroom_button"
                    onClick={acknowledge_receipt}
                  >
                    {load ? <SpinLoader color={true} /> : "Acknowledge receipt"}
                  </button>
                </div>
              )}
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
            <div className="account_body">
              <div style={{ display: "flex", alignItems: "baseline" }}>
                N<h1>{Number(amount).toFixed(2)}</h1>K
              </div>
              <div class="wallet_form">
                <p>
                  Enter total quantity to supply and the unit price of the
                  supply
                </p>
                <small>
                  Note that the final amount to pay will include Pharmapool's
                  charges and a partner can pay more than once
                </small>
                {required && <br />}
                {required && (
                  <small style={{ color: "red" }}>Type in a valid amount</small>
                )}
                <input
                  type="number"
                  placeholder="Total quantity"
                  autoFocus={true}
                  onChange={(e) => setQuantity(e.target.value)}
                  required={required}
                />
                <input
                  type="text"
                  placeholder="Unit price"
                  autoFocus={true}
                  required={required}
                  onChange={handleAmount}
                />
                <button
                  className="new_chatroom_button"
                  onClick={handle_wallet_request}
                >
                  {load ? <SpinLoader color={true} /> : "Request wallet"}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {verified && paymentComplete && (
            <div style={{ margin: "1rem 0px" }}>
              <button
                className="new_chatroom_button"
                onClick={() => setShow(false)}
              >
                Request another wallet
              </button>
            </div>
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
