import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import useWindowDimensions from "../../../components/useWindowDimensions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ChatRoomAccount() {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const { width } = useWindowDimensions();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        Request account
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Chatroom Account Details
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
          <div className="account_body">
            <p>N<h1>0.00</h1>K</p>
            <div className="interested_partners">
              <table className="account_table">
                <tr>
                  <th>Partner</th>
                  <th>Payment status</th>
                </tr>
                <tr>
                  <td>Wilson Zimthamaha Bonkuru</td>
                  <td>pending</td>
                </tr>
                <tr>
                  <td>Partner</td>
                  <td>paid</td>
                </tr>
                <tr>
                  <td>Partner</td>
                  <td>paid</td>
                </tr>
              </table>
            </div>
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
