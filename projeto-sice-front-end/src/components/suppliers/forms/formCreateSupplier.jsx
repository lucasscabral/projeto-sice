import {
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import instance from "../../../axios/instanceAxios";
import { Notify } from "notiflix";
import { mask, unMask } from "remask";

const MASK_PHONE = ["(99)9 9999-9999"];
const MASK_CNPJ = ["99.999.999/0001-99"];

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

export default function FormCreateSupplier({
  openModalCreateSupplier,
  handleCloseModalCreateSupplier,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState();

  const mutation = useMutation({
    mutationFn: () => {
      const dataProduct = {
        nomefornecedor: name,
        telefone: unMask(phone),
        CNPJ: unMask(cnpj),
        email,
        endereco: address,
      };

      return instance.post("fornecedores", dataProduct).then((res) => res.data);
    },
    onSuccess: (_) => {
      Notify.success("Fornecedor Cadastrado com sucesso!");
      handleCloseModalCreateSupplier();
    },
    onError: (error) => {
      if (error.response.status == 401) {
        Notify.failure("Já existe um fornecedor cadastrado com esse CNPJ!");
      } else {
        error.response.data.message?.map((error) => Notify.failure(`${error}`));
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={openModalCreateSupplier}
        onClose={handleCloseModalCreateSupplier}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
            <CloseIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={handleCloseModalCreateSupplier}
            />
            <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>
              Cadastrar Novo Fornecedor
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              required
              sx={{ width: 400 }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              type="text"
              required
              label="Telefone"
              sx={{ width: 350 }}
              variant="outlined"
              value={phone}
              onChange={(event) => {
                setPhone(mask(event.target.value, MASK_PHONE));
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <TextField
              id="outlined-basic"
              label="CNPJ"
              required
              type="text"
              variant="outlined"
              sx={{ width: 400 }}
              value={cnpj}
              onChange={(event) => {
                setCnpj(mask(event.target.value, MASK_CNPJ));
              }}
            />
            <TextField
              id="outlined-basic"
              required
              label="Email"
              variant="outlined"
              sx={{ width: 350 }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Endereço"
            variant="outlined"
            multiline
            minRows={2}
            sx={{ width: "100%", marginBottom: 5 }}
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />

          <ButtonsActions>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleCloseModalCreateSupplier}
            >
              {" "}
              X Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => mutation.mutate()}
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
