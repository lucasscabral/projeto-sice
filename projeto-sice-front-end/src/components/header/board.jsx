import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { TbTruckDelivery } from "react-icons/tb";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="text" {...bindTrigger(popupState)}>
            <DensityMediumIcon sx={{ fontSize: "35px", color: "white" }} />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>
              <HomeOutlinedIcon sx={{ marginRight: "5px", fontSize: "35px" }} />
              <Link
                to={"/home"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h6"> Home</Typography>{" "}
              </Link>{" "}
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <ShoppingCartOutlinedIcon
                sx={{ marginRight: "5px", fontSize: "35px" }}
              />
              <Link
                to={"/caixa"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h6">Caixa</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Inventory2OutlinedIcon
                sx={{ marginRight: "5px", fontSize: "35px" }}
              />
              <Link
                to={"/estoque"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h6">Estoque</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <TbTruckDelivery size={37} />
              <Link
                to={"/fornecedores"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h6" marginLeft={0.2}>
                  Fornecedores
                </Typography>
              </Link>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
