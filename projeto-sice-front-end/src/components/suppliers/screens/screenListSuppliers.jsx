import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TableSuppliers from "../tables/tableSuppliers";
import { useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";
import { Loading } from "notiflix";
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from "react-router-dom";
import { mask } from "remask";


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

const MASK_CNPJ = ["99.999.999/0001-99"];

export default function ScreenListSuppliers() {
  const { data, isLoading, isSuccess } = useQuery("fornecedores", () => { return instance.get("/fornecedores").then((res) => res.data) });

  if (isLoading) {
    return Loading.standard("Carregando...")
  } else if (isSuccess) {
    Loading.remove()
  }


  const columns = [
    {
      field: "idfornecedor",
      headerName: "Cód.",
      width: 80,
      disableClickEventBubbling: true,
    },
    {
      field: "nomefornecedor",
      headerName: "Nome",
      width: 210,
      disableClickEventBubbling: true,
    },
    {
      field: "CNPJ",
      headerName: "CNPJ",
      width: 150,
      disableClickEventBubbling: true,
      valueGetter: (params) => {

        return `${mask(params?.row.CNPJ, MASK_CNPJ)}`;
      }
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        marginTop={15}
        paddingLeft={10}
        paddingRight={10}
        sx={{ width: "100%" }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Lista de Fornecedores
        </Typography>

        <TableSuppliers dataContent={data} columns={columns} />
        <Link to={"/sice/fornecedores"}>
          <Button variant="contained" size="large" color="error" sx={{ textAlign: "center", marginTop: 10 }} >
            <ReplyIcon sx={{ marginRight: 1, fontSize: "30px" }} /> Voltar
          </Button>
        </Link>
      </Box>
    </ThemeProvider>
  );
}
