import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import useWindowDimensions from "../../../components/useWindowDimensions";
import { ValueContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NewChatRoomModal() {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const { tokenChecker } = useContext(ValueContext);
  let token;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChat = (friendId) => {
    fetch("http://127.0.0.1:8000/api/user/chat", {
      method: "POST",
      body: JSON.stringify({
        userId,
        friendId,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        navigate(`/chat/${json.chat._id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch(`http://127.0.0.1:8000/api/user/friends/${userId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setFriends(json.friends))
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        <InsertCommentIcon />
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Start Chat
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
          <div className="friends">
            {friends.map((friend, i) => (
              <div className="friend" onClick={() => handleChat(friend._id)}>
                <div className="friend_image">
                  <img src={friend.profileImage.imageUrl} alt="friend_logo" />
                </div>
                <h5>{friend.fullName}</h5>
              </div>
            ))}
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button color="success" autoFocus onClick={handleSubmit}>
            create
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
