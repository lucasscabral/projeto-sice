import { Autocomplete, Box, Button, TextField, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const columns = [{
    field: "idprodutos",
    headerName: "Cód.",
    width: 80,
    disableClickEventBubbling: true,
},
{
    field: "nomeproduto",
    headerName: "Nome",
    width: 210,
    disableClickEventBubbling: true,
},
{
    field: "valorunitario",
    headerName: "Val. Uni.",
    width: 150,
    disableClickEventBubbling: true,
},
{
    field: "descricao",
    headerName: "Descrição",
    width: 200,
    disableClickEventBubbling: true,
},
]

const rows = [{ idprodutos: 1, nomeproduto: "Sal Grosso", valorunitario: 15.2, descricao: "Muito top para o seu churras Muito top para o seu churras Muito top para o seu churras Muito top para o seu churras" }, { idprodutos: 2, nomeproduto: "Sal Grosso", valorunitario: 15.2, descricao: "Muito top para o seu churras" }]


const fornecedores = [{ nome: "Lucas" }, { nome: "Gabriel" }]

const theme = createTheme({
    palette: {
        info: {
            main: '#00A09D'
        }
    }
})


export default function RegistrarCompras() {
    const [supplier, setSupplier] = useState();
    const [products, setProducts] = useState();

    return (
        <ThemeProvider theme={theme}>
            <Box paddingLeft={10} paddingTop={10} paddingRight={10} sx={{ width: "100%", background: "#f0f0f0", height: "100%" }}>
                < Box paddingLeft={10} paddingRight={10} paddingTop={3} sx={{ width: "100%", background: "#fff", height: "100dvh", border: "1px solid black" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>Registrar Compras</ Typography>
                    <Box marginTop={5} sx={{ display: "flex", gap: 5 }}>
                        <Autocomplete
                            disablePortal
                            id="input-fornecedores"
                            value={supplier}
                            onChange={(_, newValue) => {
                                setSupplier(newValue);
                            }}
                            options={fornecedores}
                            getOptionLabel={(option) => option.nome}
                            noOptionsText="Fornecedor não encontrado"
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Fornecedores" />}
                        />
                        {supplier ?
                            <Box sx={{ display: "flex", gap: 3 }}>
                                <Autocomplete
                                    disablePortal
                                    id="input-produtos-fornecedor"
                                    value={products}
                                    onChange={(_, newValue) => {
                                        setProducts(newValue);
                                    }}
                                    options={fornecedores}
                                    getOptionLabel={(option) => option.nome}
                                    noOptionsText="Produto não encontrado"
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Produtos" />}
                                />
                                <TextField label="Qtd." sx={{ width: 100 }} />
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, flexDirection: "row" }}>
                                    <Tooltip title="Cancelar produto">
                                        <Button variant="contained" size="large" color="error">Cancelar</Button>
                                    </Tooltip>
                                    <Tooltip title="Adicionar produto a lista de compras">
                                        <Button variant="contained" size="large" color="info">Adicionar</Button>
                                    </Tooltip>
                                </Box>
                            </Box> : null

                        }
                        <Tooltip title="Cadastrar novo produto">
                            <Button variant="contained" size="large" color="success" >Cadastrar Produto</Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ height: 400, width: '100%', marginTop: 3 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(rows) => rows.idprodutos}
                            disableRowSelectionOnClick
                            disableColumnMenu
                            getEstimatedRowHeight={() => 200}
                            getRowHeight={() => "auto"}
                            key={rows}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                        />
                    </Box>
                </Box >
            </Box >
        </ThemeProvider>
    )


}