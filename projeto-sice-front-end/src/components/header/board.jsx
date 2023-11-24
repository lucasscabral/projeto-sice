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
            <Link
              to={"/sice/home"}
              style={{ display: "flex", textDecoration: "none", color: "black", width: "100%" }}
            >
              <MenuItem onClick={popupState.close} sx={{ width: "100%" }}>

                <HomeOutlinedIcon sx={{ marginRight: "5px", fontSize: "35px" }} />
                <Typography variant="h6"> Home</Typography>
              </MenuItem>
            </Link>

            <Link
              to={"/sice/caixa"}
              style={{ display: "flex", textDecoration: "none", color: "black", width: "100%" }}
            >
              <MenuItem onClick={popupState.close} sx={{ width: "100%" }}>
                <ShoppingCartOutlinedIcon
                  sx={{ marginRight: "5px", fontSize: "35px" }}
                />
                <Typography variant="h6">Caixa</Typography>
              </MenuItem>
            </Link>

            <Link
              to={"/sice/estoque"}
              style={{ display: "flex", textDecoration: "none", color: "black", width: "100%" }}
            >
              <MenuItem onClick={popupState.close} sx={{ width: "100%" }}>

                <Inventory2OutlinedIcon
                  sx={{ marginRight: "5px", fontSize: "35px" }}
                />
                <Typography variant="h6">Estoque</Typography>
              </MenuItem>
            </Link>

            <Link
              to={"/sice/fornecedores"}
              style={{ display: "flex", textDecoration: "none", color: "black", width: "100%" }}
            >
              <MenuItem onClick={popupState.close} sx={{ width: "100%" }}>
                <TbTruckDelivery size={37} />
                <Typography variant="h6" marginLeft={0.2}>
                  Fornecedores
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
