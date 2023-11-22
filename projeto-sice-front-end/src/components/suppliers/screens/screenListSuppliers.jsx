import {
  Box,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TableSuppliers from "../tables/tableSuppliers";
import { useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";

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

export default function ScreenListSuppliers() {
  const { data, error, refetch } = useQuery("fornecedores", () => {
    return instance.get("/fornecedores").then((res) => {
      console.log(res);
      return res.data;
    });
  });
  console.log(data);
  console.log(error);
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
    },
    {
      headerName: "Ações",
      width: 150,
      //   renderCell: (params) => (
      //     <ButtonActions
      //       {...{
      //         params,
      //         refetch,
      //         modification,
      //         setModification,
      //       }}
      //     />
      //   ),

      sortable: false,
      filterable: false,
      disableClickEventBubbling: true,
    },
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
        <Divider variant="fullWidth" color="#232723" sx={{ marginTop: 2 }} />

        <TableSuppliers rows={data} columns={columns} />
      </Box>
    </ThemeProvider>
  );
}
