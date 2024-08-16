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
import { useNavigate } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import SpinLoader from "../../../components/SpinLoader";

import useWindowDimensions from "../../../components/useWindowDimensions";

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
  const [verified, setVerified] = useState(false);
  const [wallet, setWallet] = useState({});
  const [partners, setPartners] = useState([]);
  const [required, setRequired] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }

    fetch(`https://www.pharmapoolserver.com/api/wallet/chat/${id}`, {
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
        setWallet(json.wallet);
        setPartners(json.chat.users);
        const paid_user = json.wallet.referenceCodes.find(
          (user) => user.user._id === userId
        );
        if (paid_user !== undefined) {
          setPaid(true);
        }
        if (paid_user.paymentStatus) {
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  }, [tokenChecker, navigate, id]);

  const handleAmount = (e) => {
    const requested_amount = e.target.value;
    const amount_to_pay =
      Number(requested_amount) * 0.1 + Number(requested_amount);
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
      navigate("/signin");
    }

    fetch(`https://www.pharmapoolserver.com/api/wallet/chat/${id}`, {
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
        setWallet(json.wallet);
        setPartners(json.chat.users);
      })
      .catch((err) => console.log(err));
  };

  const handle_payment = () => {
    setLoad(true);
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }

    fetch(
      `https://www.pharmapoolserver.com/api/wallet/payment/accept/${wallet.walletAddress}`,
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
        const paid_user = json.wallet.referenceCodes.find(
          (user) => user.user === userId
        );
        if (paid_user !== undefined) {
          setLoad(false);
          setPaid(true);
          localStorage.setItem("reference", paid_user.reference);
          popup.resumeTransaction(json.result.data.access_code);
        }
        if (paid_user.paymentStatus) {
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
      navigate("/signin");
    }

    fetch(
      `https://www.pharmapoolserver.com/api/wallet/payment/verify/chat/${wallet.walletAddress}`,
      {
        method: "POST",
        body: JSON.stringify({
          reference,
          chatId: id,
        }),
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setWallet(json.wallet);
        setPartners(json.chat.users);
        const paid_user = json.wallet.referenceCodes.find(
          (user) => user.user._id === userId
        );
        if (paid_user !== undefined) {
          setLoad(false);
          setPaid(true);
        }
        if (paid_user.paymentStatus) {
          setLoad(false);
          setVerified(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        wallet
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chat Account Details
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
              <div style={{ display: "flex", alignItems: "baseline" }}>
                N<h1>{wallet.balance}</h1>K
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
              </div>
              {!verified && (
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
                  charges
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
          <Button color="success" autoFocus onClick={handleClose}>
            done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
