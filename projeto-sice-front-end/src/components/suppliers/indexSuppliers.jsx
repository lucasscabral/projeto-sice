import {
  Box,
  Button,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import FormCreateSupplier from "./forms/formCreateSupplier";
import { useState } from "react";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    info: {
      main: "#00A09D",
    },
    success: {
      main: "#00A09D",
    },
  },
});

export default function IndexSuppliers() {
  const [openModalCreateSupplier, setOpenModalCreateSupplier] = useState(false);
  const handleOpenModalCreateSupplier = () => setOpenModalCreateSupplier(true);
  const handleCloseModalCreateSupplier = () =>
    setOpenModalCreateSupplier(false);

  return (
    <ThemeProvider theme={theme}>
      <Box
        marginTop={15}
        paddingLeft={10}
        paddingRight={10}
        sx={{ width: "100%" }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Fornecedores
        </Typography>
        <Divider variant="fullWidth" color="#232723" sx={{ marginTop: 2 }} />

        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            marginTop: 8,
            gap: 4,
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{ fontWeight: "bold", width: 250, height: 50 }}
          >
            <Link
              to={"lista"}
              style={{ textDecoration: "none", color: "white", width: "100%" }}
            >
              Fornecedores
            </Link>
          </Button>
          <Button
            variant="contained"
            size="large"
            color="info"
            sx={{ fontWeight: "bold", width: 250, height: 50 }}
            onClick={handleOpenModalCreateSupplier}
          >
            Cadastrar Novo Fornecedor
          </Button>
          <Link to={"/sice/fornecedores/registra-compras"} style={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              color="info"
              sx={{ fontWeight: "bold", width: 250, height: 50 }}
            >
              Registrar Compra
            </Button>
          </Link>
          <Link to={"/sice/fornecedores/lista-compras"} style={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              color="info"
              sx={{ fontWeight: "bold", width: 250, height: 50 }}
            >
              Listagem de Compras
            </Button>
          </Link>
        </Box>
      </Box>
      {openModalCreateSupplier ? (
        <FormCreateSupplier
          openModalCreateSupplier={openModalCreateSupplier}
          handleCloseModalCreateSupplier={handleCloseModalCreateSupplier}
        />
      ) : null}
    </ThemeProvider>
  );
}
