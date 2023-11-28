import { Box, Typography } from "@mui/material";
import { DataGrid, GridLogicOperator, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { AiOutlineInbox } from "react-icons/ai";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        mb: 3,
      }}
    >
      <GridToolbarQuickFilter
        sx={{
          border: "1px lightgray solid",
          borderRadius: 3,
          p: 1,
        }}
        placeholder="Buscar por Id ou nome"
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

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

function CustomnoResultsOverlay() {
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
      <Typography variant="h6">Fornecedor não encontrado!</Typography>
    </Box>
  );
}


export default function TableSuppliers({ dataContent, columns }) {

  return (
    <DataGrid
      sx={{ p: 3, marginTop: 5 }}
      autoHeight
      rows={dataContent}
      columns={columns}
      getRowId={(rows) => rows.idItensCompra ? rows.idItensCompra : rows.idfornecedor}
      key={(rows) => rows.idItensCompra}
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
        toolbar: QuickSearchToolbar,
        noRowsOverlay: CustomNoRowsOverlay,
        noResultsOverlay: CustomnoResultsOverlay,
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
