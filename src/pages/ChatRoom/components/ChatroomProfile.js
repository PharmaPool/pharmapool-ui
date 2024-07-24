import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatRoomAccount from "./ChatRoomAccount";
import AddFriendModal from "./AddFriendModal";
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

export default function ChatroomProfile({ title, users, id, admin }) {
  const [open, setOpen] = React.useState(false);
  const { tokenChecker } = React.useContext(ValueContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeave = () => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch("http://127.0.0.1:8000/api/user/chatroom/leave", {
      method: "DELETE",
      body: JSON.stringify({
        chatId: id,
      }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => navigate("/chatrooms"))
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        <MoreVertIcon />
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
          {title}
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
            <div class="account_buttons">
              <ChatRoomAccount />
              <AddFriendModal id={id} users={users} />
            </div>
            <div className="interested_partners">
              <table className="account_table">
                <tr>
                  <th>Partners</th>
                </tr>
                {users.map((user, i) => (
                  <tr key={i}>
                    {/* <td></td> */}
                    <td
                      style={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem",
                      }}
                    >
                      <div className="result_user_image">
                        <img src={user.profileImage.imageUrl} alt="" />
                      </div>
                      {user.fullName}
                    </td>
                    {admin === user._id && (
                      <td
                        style={{
                          textTransform: "capitalize",
                          textDecoration: "underline",
                          color: "red",
                          padding: "0.5rem",
                          fontSize: "small",
                        }}
                      >
                        Admin
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" autoFocus onClick={handleLeave}>
            remove partner
          </Button>
          <Button color="error" autoFocus onClick={handleLeave}>
            leave chatroom
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
