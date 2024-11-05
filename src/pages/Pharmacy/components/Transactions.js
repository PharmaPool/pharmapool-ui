import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";

import useWindowDimensions from "../../../components/useWindowDimensions";
import { ValueContext } from "../../../Context";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Transactions({ id }) {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=/pharmacy`);
    }
    fetch(`http://127.0.0.1:8000/api/business/pharmacy/${id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=/pharmacy`);
        }
        setTransactions(json.pharmacy.allTransactions);
      })
      .catch((err) => console.log(err));
  }, [tokenChecker, id, navigate]);

  return (
    <React.Fragment>
      <button color="success" variant="outlined" onClick={handleClickOpen}>
        {width > 900 ? "Transactions" : <ReceiptIcon />}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h2 style={{ textTransform: "capitalize" }}>all transactions</h2>
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
          <div className="transaction_table">
            <table>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Strength</th>
                <th>manufacturer</th>
                <th>Date in</th>
                <th>expiry date</th>
                <th>quantity</th>
                <th>remark</th>
              </tr>
              {transactions.map((transaction, i) => {
                return (
                  <tr>
                    <td>{transaction.product}</td>
                    <td>{transaction.brand}</td>
                    <td>{transaction.strength}</td>
                    <td>{transaction.manufacturer}</td>
                    <td>
                      {new Date(transaction.dateIn)
                        .toUTCString()
                        .substring(0, 16)}
                    </td>
                    <td>
                      {new Date(transaction.expiryDate)
                        .toUTCString()
                        .substring(0, 16)}
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.remark}</td>
                  </tr>
                );
              })}
            </table>
          </div>
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
