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
  const [open, setOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const { width } = useWindowDimensions();

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
      setPreviewImage([
        ...previewImage,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
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
            <textarea name="" id="" placeholder="Whats on your mind?"></textarea>
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
                <AddIcon /> Add images
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="success" autoFocus onClick={handleClose}>
            Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
