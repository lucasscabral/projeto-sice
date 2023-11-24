import {
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { mask } from "remask";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";
import { Notify } from "notiflix";

const MASK_INPUT_CPF = ["999.999.999-99"];
const MASK_INPUT_TELEFONE = ["(99)9 9999-9999"];

export default function IndexSingnUp() {
  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [cargo, setCargo] = useState([]);
  const [phone, setPhone] = useState();
  const [endereco, setEndereco] = useState();
  const { data } = useQuery("cargo", () => {
    return instance.get("cargo").then((res) => res.data);
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      const dataSignUp = {
        nomefuncionario: name,
        cpf,
        Cargo_idCargo: parseInt(cargo[0].idCargo),
        funcionariotelefone: phone,
        endereco,
      };

      return instance
        .post("funcionario/signUp", dataSignUp)
        .then((res) => res.data);
    },
    onSuccess: (_) => {
      Notify.success("Funcionário cadastrado com sucesso!");
      navigate("/");
    },
    onError: (error) => {
      if (error.response.status == 401) {
        Notify.failure("Este funcionário já esta cadastrado!");
      } else {
        error.response.data.message?.map((error) => Notify.failure(`${error}`));
      }
    },
  });

  const handleChange = (event) => {
    setCargo((cargo.length = 0));
    const dataCargo = {
      idCargo: event.target.value.idCargo,
      nomecargo: event.target.value.cargonome,
    };
    setCargo([...cargo, dataCargo]);
  };

  return (
    <Box
      sx={{
        gap: 5,
        width: "55%",
        borderRadius: "0 20px 20px 0",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        fontFamily={"fantasy"}
        sx={{ color: "GrayText", textShadow: "0px 2px rgba(0,0,0,0.50)" }}
        noWrap
        component="div"
      >
        SICE
      </Typography>
      <Typography variant="subtitle1" component="div">
        Faça o seu cadastro aqui!
      </Typography>
      <FormControl
        sx={{
          gap: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Nome do Funcionário"
              sx={{ minWidth: 100 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="CPF do Funcionário"
              sx={{ minWidth: 100 }}
              value={cpf}
              onChange={(e) => setCpf(mask(e.target.value, MASK_INPUT_CPF))}
            />
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="cargo-select-label">Cargo</InputLabel>
              <Select
                key={"cargo"}
                labelId="cargo-label"
                id="cargo-select"
                required
                value={cargo[0]?.cargonome}
                label="Categoria"
                onChange={handleChange}
              >
                {data?.map((cargo) => (
                  <MenuItem key={cargo.idCargo} value={cargo}>
                    {cargo.cargonome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Telefone"
              sx={{ minWidth: 100 }}
              value={phone}
              onChange={(e) =>
                setPhone(mask(e.target.value, MASK_INPUT_TELEFONE))
              }
            />
            <TextField
              label="Endereço"
              sx={{ minWidth: 100 }}
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => mutation.mutate()}
        >
          Cadastre-se
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <Typography>Já possui uma conta? Faça login aqui!</Typography>
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
}
