import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ValueContext } from "../../../Context";
import { useNavigate, useLocation } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import SpinLoader from "../../../components/SpinLoader";
import { jwtDecode } from "jwt-decode";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ChatAccount({ id }) {
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
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(`https://pharmapoolserver.com/api/wallet/chat/${id}`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.chat.wallet) {
          setShow(false);
          return;
        } else {
          setShow(true);
        }
        setSupplier(json.wallet.supplier);
        setPaymentComplete(json.wallet.paymentComplete);
        setWallet(json.wallet);
        setPartners(json.chat.users);
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
          setPaid(true);
          setVerified(false);
        }
      })
      .catch((err) => console.log(err));
  }, [tokenChecker, navigate, id]);

  const handleAmount = (e) => {
    const requested_amount = e.target.value;
    const amount_to_pay =
      Number(requested_amount) * 0.035 + Number(requested_amount);
    setAmount(amount_to_pay);
  };

  const handle_wallet_request = () => {
    setLoad(true);
    const token = tokenChecker();
    if (amount < 1) {
      setRequired(true);
      return;
    }
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    fetch(`https://pharmapoolserver.com/api/wallet/chat/${id}`, {
      method: "POST",
      body: JSON.stringify({
        amount,
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
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    fetch(
      `https://pharmapoolserver.com/api/wallet/payment/accept/${wallet.walletAddress}`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: Number(wallet.amount),
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

    fetch(
      `https://pharmapoolserver.com/api/wallet/payment/verify/chat/${wallet.walletAddress}`,
      {
        method: "POST",
        body: JSON.stringify({
          reference,
          chatId: id,
          amount: wallet.amount,
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
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    if (supplier.user._id === userId) {
      setAcctType("supplier");
    } else {
      setAcctType("partner");
    }

    fetch(`https://pharmapoolserver.com/api/wallet/receipt/acknowledge/chat`, {
      method: "POST",
      body: JSON.stringify({
        chatId: id,
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
          Chat wallet details
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
                  The partner concerned will pay: N
                  <span style={{ fontWeight: "bold" }}>
                    {Number(wallet.amount)}
                  </span>
                </p>
                <p>
                  Supplier:
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {supplier.user.fullName}
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
                    <button
                      className="new_chatroom_button"
                      onClick={handle_payment}
                    >
                      {load ? <SpinLoader color={true} /> : "Pay now"}
                    </button>
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
                    <button
                      className="new_chatroom_button"
                      onClick={handle_payment}
                    >
                      {load ? <SpinLoader color={true} /> : "Pay again"}
                    </button>
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
                      <th>Payment status</th>
                    </tr>
                    {wallet.referenceCodes.map((user) => (
                      <tr>
                        <td>{user.user.fullName}</td>
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
                N<h1>{amount}</h1>K
              </div>
              <div class="wallet_form">
                <p>Enter business amount</p>
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
                  placeholder="Amount"
                  autoFocus={true}
                  onChange={handleAmount}
                  required={required}
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
