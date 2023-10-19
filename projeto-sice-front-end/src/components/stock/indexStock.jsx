import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import TableUtils from "../../utils/tableUtils";
import styled from "styled-components";
import { useQuery } from "react-query";
import instance from "../../axios/instanceAxios";
import { useState } from "react";
import ButtonActions from "./buttonActions";
import FormCreationProduct from "./forms/formCretionProduct";
import { Loading } from "notiflix";
import * as dayjs from "dayjs";

const theme = createTheme({
    palette: {
        info: {
            main: '#00A09D'
        }
    }
})


export default function IndexStock() {
    const [modification, setModification] = useState(false);
    const [rowSelected, setRowSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data, isLoading, isSuccess, refetch } = useQuery("produtos", () => { return instance.get("/produtos").then((res) => res.data) })

    localStorage.setItem(
        "rowSelected",
        rowSelected ? JSON.stringify(rowSelected) : null
    );

    const columns = [
        {
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
            field: "categoria",
            headerName: "Categoria",
            width: 150,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                return `${params?.row.categoria.nomecategoria}`;
            },
        },
        {
            field: "vencimento",
            headerName: "vencimento",
            width: 200,
            disableClickEventBubbling: true,
            valueGetter: (params) => dayjs(params?.row.vencimento).format('DD/MM/YYYY')
        },
        {
            field: "quantidade",
            headerName: "Qtd.",
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            field: "valor_unitario",
            headerName: "Val.Uni.",
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            headerName: "Ações",
            width: 150,
            renderCell: (params) => (
                <ButtonActions
                    {...{
                        params,
                        refetch,
                        modification,
                        setModification,
                    }}
                />
            ),

            sortable: false,
            filterable: false,
            disableClickEventBubbling: true,
        },
    ]

    if (isLoading) {
        return Loading.standard("Carregando...")
    } else if (isSuccess) Loading.remove()

    return (
        <ThemeProvider theme={theme}>
            <Box marginTop={15} paddingLeft={10} paddingRight={10} sx={{ width: "100%" }}>
                <Cabecalho>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>ESTOQUE</ Typography>
                    <Button variant="contained" size="large" color="info" sx={{ fontWeight: "bold" }} onClick={handleOpen}>+ Adicionar</Button>
                </Cabecalho>
                <TableUtils dataContent={data} columns={columns} setRowSelected={setRowSelected} />
                {open ? <FormCreationProduct open={open} handleClose={handleClose} refetch={refetch} /> : null}
            </Box>
        </ThemeProvider>
    )
}


const Cabecalho = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10;
`