import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import images from "../../../data/images";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function NewChatRoomModal({ business }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className="new_chatroom_button" onClick={handleClickOpen}>
        How to create
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <h1 style={{ textTransform: "uppercase" }}>
            How to create a {business}
          </h1>
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
          <div className="how_it_works">
            <li>Click create business</li>
            <div className="how_it_works_img">
              <img src={images.createBusiness} alt="" />
            </div>
            <li>
              Select '<b style={{ textTransform: "uppercase" }}>{business}</b>'
            </li>
            <li>Fill in the details</li>
            <ul>
              {business === "joint purchase" && (
                <li>
                  Describe how you want the business (e.g I need 20 partners for
                  '<b style={{ textTransform: "uppercase" }}>{business}</b>
                  '.)
                </li>
              )}
              {business === "demand" && (
                <li>
                  Describe how you want the business (e.g Supply 2 cartons of Emgyl tablets in a single
                  delivery.
                </li>
              )}
              {business === "sale at discount" && (
                <li>
                  Describe how you want the business (e.g We offer a drug cost
                  discount of 10% '
                  <b style={{ textTransform: "uppercase" }}>{business}</b>
                  '.)
                </li>
              )}
              <li>Generic name (e.g Metronidazole)</li>
              <li>Brand name (e.g Emgyl)</li>
              <li>Strength (e.g 500mg)</li>
              <li>Manufacturer (e.g Emzor)</li>
              <li>
                Expiry date (i.e the expiry date of the drug should not be below
                specified date)
              </li>
              <li>Quantity (e.g 500 cartons)</li>
              <li>Location of Pharmacy (e.g Jimeta, Adamawa state)</li>
              <li>
                Deadline (i.e How long the business will be open e.g 1 month)
              </li>
            </ul>
            <li>
              Click '<b style={{ textTransform: "uppercase" }}>submit</b>'
            </li>
            <div className="how_it_works_img">
              {business === "demand" && (
                <img src={images.demandProcess} alt="" />
              )}
              {business === "joint purchase" && (
                <img src={images.jointPurchaseProcess} alt="" />
              )}
              {business === "sale at discount" && (
                <img src={images.saleProcess} alt="" />
              )}
            </div>
            <li>Business is successfully created</li>
            <div className="how_it_works_img">
              {business === "demand" && (
                <img src={images.demandBusiness} alt="" />
              )}
              {business === "joint purchase" && (
                <img src={images.jointPurchaseBusiness} alt="" />
              )}
              {business === "sale at discount" && (
                <img src={images.saleBusiness} alt="" />
              )}
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
