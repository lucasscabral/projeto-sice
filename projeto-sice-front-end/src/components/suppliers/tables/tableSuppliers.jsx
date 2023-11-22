import { Box, Typography } from "@mui/material";
import { DataGrid, GridLogicOperator } from "@mui/x-data-grid";
import { AiOutlineInbox } from "react-icons/ai";

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        width: 1,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AiOutlineInbox size={100} style={{ marginBottom: "15px" }} />
      <Typography variant="h6">Lista de Fornecedores Vazio!</Typography>
    </Box>
  );
}

export default function TableSuppliers({ rows, columns }) {
  return (
    <DataGrid
      sx={{ p: 3, marginTop: 5 }}
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(rows) => rows.idprodutos}
      disableRowSelectionOnClick
      disableColumnMenu
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
        filter: {
          filterModel: {
            items: [],
            quickFilterLogicOperator: GridLogicOperator.Or,
          },
        },
      }}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomNoRowsOverlay,
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
