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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import useWindowDimensions from "../../../components/useWindowDimensions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ImageModal() {
  const _id = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { width } = useWindowDimensions();

  let url, file, business;
  url = `http://127.0.0.1:8000/profile/details/${_id}/image`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    const formData = new FormData();
    formData.append("type", "profile");
    formData.append("file", selectedFile);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = () => {
    const inp = document.getElementById("product_image");
    inp.click();
  };

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleClickOpen}>
        <AddAPhotoIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={width < 1000 ? true : false}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Upload an image
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
          <div className="business_form">
            <div className="image_preview">
              {previewImage.map((img, i) => (
                <img src={img} alt="" width={100} height={100} key={i} />
              ))}
            </div>
            <div className="business_product_image" onClick={handleImageUpload}>
              <input
                type="file"
                name="product_image"
                id="product_image"
                onChange={imageChange}
                hidden
              />
              <AddIcon /> Add product image
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="success" autoFocus onClick={handleSubmit}>
            upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
