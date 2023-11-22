import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useQuery } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import instance from "../../../axios/instanceAxios";
import { mask } from "remask";

const theme = createTheme({
  palette: {
    success: {
      main: "#00A09D",
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function FormSelectionProduct({
  open,
  handleClose,
  productsSelected,
  setProductsSelected,
}) {
  const { data } = useQuery("produtos", () => {
    return instance.get("/produtos").then((res) => res.data);
  });
  const [quantity, setQuantity] = useState();
  const [productSelected, setProductSelected] = useState();
  function selectedProduct() {
    handleClose();
    setProductsSelected([
      ...productsSelected,
      { ...productSelected, quantidade: quantity },
    ]);
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
            <CloseIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={handleClose}
            />
            <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>
              Adicionar Produto
            </Typography>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid gray",
              marginBottom: 4,
              borderRadius: 1,
              padding: 5,
              width: "100%",
              height: 150,
            }}
          >
            <Autocomplete
              disablePortal
              id="list-products"
              options={data}
              getOptionLabel={(option) => option?.nomeproduto}
              value={productSelected?.newInputValue}
              onChange={(_, newInputValue) => {
                setProductSelected(newInputValue);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Produtos" />
              )}
            />
            <TextField
              id="quantidade"
              label="Quantidade"
              variant="outlined"
              type="text"
              required
              sx={{ width: 200 }}
              value={quantity}
              onChange={(event) => {
                setQuantity(mask(event.target.value, "9999999999"));
              }}
            />
          </Box>
          <ButtonsActions>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleClose}
            >
              {" "}
              X Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={
                !productSelected || !quantity || quantity <= 0 ? true : false
              }
              size="large"
              onClick={selectedProduct}
            >
              <CheckIcon /> Salvar
            </Button>
          </ButtonsActions>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

const ButtonsActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
