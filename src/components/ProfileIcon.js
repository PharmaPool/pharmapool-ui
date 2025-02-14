import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { ValueContext } from "../Context";

import { useNavigate, useLocation } from "react-router-dom";

export default function AccountMenu() {
  const { tokenChecker, logOut } = React.useContext(ValueContext);
  const firstName = localStorage.getItem("firstName");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    fetch(`https://pharmapoolserver.com/api/auth/signout/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        logOut();

        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  // React.useEffect(() => {
  //   const token = tokenChecker();
  //   if (!token) {
  //     navigate("/signin");
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            style={{ margin: "0px" }}
          >
            <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
              {firstName}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 0,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/pharmacy")}>
          <ListItemIcon>
            <LocalPharmacyIcon />
          </ListItemIcon>{" "}
          Visit Pharmacy
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/product-gallery")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>{" "}
          Product Gallery
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
