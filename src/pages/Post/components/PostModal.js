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
import AddIcon from "@mui/icons-material/Add";

import SpinLoader from "../../../components/SpinLoader";

// import { ValueContext } from "../Context";

import useWindowDimensions from "../../../components/useWindowDimensions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PostModal() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const { width } = useWindowDimensions();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  let file;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = () => {
    const inp = document.getElementById("product_image");
    inp.click();
  };

  const imageChange = (e) => {
    if (e.target.files) {
      file = e.target.files[0];
      setPreviewImage([
        ...previewImage,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    setLoad(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("content", content);
    formData.append("userId", _id);

    fetch("http://127.0.0.1:8000/api/user/post", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        window.location.reload();
        setOpen(false);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Button color="success" variant="outlined" onClick={handleClickOpen}>
        create post
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={width < 1000 ? true : false}
        fullWidth={width > 1000 ? true : false}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Post
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
          <div className="post_form">
            <textarea
              name=""
              id=""
              placeholder="Whats on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="post_form_body">
              <div className="image_preview">
                {previewImage.map((img, i) => (
                  <img src={img} alt="" width={100} height={100} key={i} />
                ))}
              </div>
              <div
                className="business_product_image"
                onClick={handleImageUpload}
              >
                <input
                  type="file"
                  name="product_image"
                  id="product_image"
                  onChange={imageChange}
                  hidden
                />
                <AddIcon /> Add an image
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="success" autoFocus onClick={handleSubmit}>
            {load ? <SpinLoader color={false} /> : "Post"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
