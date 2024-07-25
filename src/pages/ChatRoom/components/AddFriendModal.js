import * as React from "react";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close";
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

export default function AddFriendModal({ id, users }) {
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const { socket, tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  socket.on("search", (result) => {
    setResult(result.user);
  });

  const handleAdd = (friendId) => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch("https://pharmapoolserver.com/api/user/chatroom/add", {
      method: "POST",
      body: JSON.stringify({
        chatId: id,
        friendId,
      }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => window.location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        add partner
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{ textTransform: "capitalize" }}
        >
          Add partner
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
          <div class="add_friend">
            <div class="add_friend_input">
              <input
                type="search"
                placeholder="search partner"
                onChange={(e) =>
                  socket.emit("search", { name: e.target.value })
                }
              />
            </div>
            <div class="search_result">
              {result.length > 0 &&
                result.map((user) => (
                  <div className="search_result_item">
                    <div>
                      <div className="result_user_image">
                        <img src={user.profileImage.imageUrl} alt="" />
                      </div>
                    </div>
                    <div
                      className="chat_titl"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <p>{user.fullName}</p>
                    </div>
                    <div>
                      {users.find((partner) => partner._id === user._id) ===
                        undefined && (
                        <button
                          className="add_button"
                          onClick={() => handleAdd(user._id)}
                        >
                          <PersonAddAltIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
