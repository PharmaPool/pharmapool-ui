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
  const _id = localStorage.getItem("userId");
  const [open, setOpen] = React.useState(false);
  const [bt1, setBt1] = React.useState(false);
  const [bt2, setBt2] = React.useState(false);
  const [bt3, setBt3] = React.useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [genericName, setGenericName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [strength, setStrength] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [locationOfPharmacy, setLocationOfPharmacy] = useState("");
  const [quantity, setQuantity] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { width } = useWindowDimensions();
  const token = localStorage.getItem("token");

  let url, file, business;
  url = `https://www.pharmapoolserver.com/api/business/${_id}`;
  if (bt1) {
    business = "demand";
  } else if (bt2) {
    business = "joint purchase";
  } else if (bt3) {
    business = "sale";
  }

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
    formData.append("file", selectedFile);
    formData.append("genericName", genericName);
    formData.append("brandName", brandName);
    formData.append("strength", strength);
    formData.append("expiryDate", expiryDate);
    formData.append("manufacturer", manufacturer);
    formData.append("locationOfPharmacy", locationOfPharmacy);
    formData.append("quantity", quantity);
    formData.append("content", content);
    formData.append("deadline", deadline);
    formData.append("business", business);

    fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
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
        create business
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={width < 1000 ? true : false}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <button
            className={bt1 ? "business_button_select" : "business_buttons"}
            onClick={() => {
              setBt1(true);
              setBt2(false);
              setBt3(false);
            }}
          >
            Demand
          </button>
          <button
            className={bt2 ? "business_button_select" : "business_buttons"}
            onClick={() => {
              setBt1(false);
              setBt2(true);
              setBt3(false);
            }}
          >
            Joint Purchase
          </button>
          <button
            className={bt3 ? "business_button_select" : "business_buttons"}
            onClick={() => {
              setBt1(false);
              setBt2(false);
              setBt3(true);
            }}
          >
            Sales at Discount
          </button>
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
            <textarea
              name=""
              id=""
              placeholder="choose your business type above and describe how you want it"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="business_form_body">
              <div>
                <h6>Product Information</h6>
                <input
                  type="text"
                  placeholder="generic name"
                  value={genericName}
                  onChange={(e) => setGenericName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="strength"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="manufacturer"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="expiry date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="location of pharmacy"
                  value={locationOfPharmacy}
                  onChange={(e) => setLocationOfPharmacy(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
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
                <AddIcon /> Add product image
              </div>
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
