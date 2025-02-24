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

import { useNavigate, useLocation } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Register() {
  const _id = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [motto, setMotto] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const locations = useLocation();
  const navigate = useNavigate();

  let url, file;
  url = `https://pharmapoolserver.com/api/business/pharmacy/${_id}`;

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
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("businessName", businessName);
    formData.append("about", motto);
    formData.append("location", location);
    formData.append("contactNumber", contactNumber);

    fetch(url, {
      method: "POST",
      body: formData,
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${locations.pathname}`);
          return;
        }
        window.location.reload();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = () => {
    const inp = document.getElementById("product_image");
    inp.click();
  };

  return (
    <React.Fragment>
      <Button color="success" variant="outlined" onClick={handleClickOpen}>
        <AddIcon /> register new pharmacy
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // fullScreen={width < 1000 ? true : false}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Register Pharmacy
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
          <div className="pharmacy_form">
            <textarea
              name=""
              id=""
              placeholder="Name of Pharmacy"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            ></textarea>
            <div className="business_form_body">
              <div>
                <h6>Pharmacy Info</h6>
                <input
                  type="text"
                  placeholder="Motto"
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
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
                <AddIcon /> Add Pharmacy Logo
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="success" autoFocus onClick={handleSubmit}>
            {loading ? "registering..." : "register"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
