import * as React from "react";
import { useState, useContext } from "react";
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

import { ValueContext } from "../../../Context";
import { useNavigate, useLocation } from "react-router-dom";

import useWindowDimensions from "../../../components/useWindowDimensions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NewChatRoomModal() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  let url;
  url = `https://www.pharmapoolserver.com/api/user/chatroom/create`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        <GroupAddIcon />
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          create chatroom
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
          <div className="chatroom_form">
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="success" autoFocus onClick={handleSubmit}>
            create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
