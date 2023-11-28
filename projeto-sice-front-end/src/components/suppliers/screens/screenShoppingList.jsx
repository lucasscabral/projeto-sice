import { Box, Button, Typography } from "@mui/material";
import TableUtils from "../../../utils/tableUtils";
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";
import { Loading } from "notiflix";
import TableSuppliers from "../tables/tableSuppliers";
import dayjs from "dayjs";


export default function ScreenShoppingList() {
    const { data, isLoading, isSuccess } = useQuery("lista-compras", () => { return instance.get("/fornecedores/lista-compras").then((res) => res.data) })

    if (isLoading) {
        return Loading.standard("Carregando...")
    } else if (isSuccess) {
        Loading.remove()

    }
    const columns = [
        {
            field: "idItensCompra",
            headerName: "Cód.",
            width: 80,
            disableClickEventBubbling: true,
        },
        {
            field: "nomeproduto",
            headerName: "Nome",
            width: 210,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                return `${params?.row.produtos.nomeproduto}`;
            },
        },
        {
            field: "valorTotal",
            headerName: "Total da Compra",
            width: 150,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                return `R$ ${params?.row.valorTotal}`
            }
        },
        {
            field: "datacompra",
            headerName: "Data Compra",
            width: 200,
            disableClickEventBubbling: true,
            valueGetter: (params) => dayjs(params?.row.compras.datacompra).format('DD/MM/YYYY')
        },
        {
            field: "quantidade",
            headerName: "Qtd.",
            width: 160,
            disableClickEventBubbling: true,
        },
        {
            field: "nomefornecedor",
            headerName: "Fornecedor",
            width: 160,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                return `${params?.row.compras.fornecedores.nomefornecedor}`;
            },
        }
    ]

    return (
        <Box marginTop={15} paddingLeft={10} paddingRight={10} sx={{ width: "100%" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>Listagem de Compras</ Typography>

            <TableSuppliers dataContent={data} columns={columns} />

            <Link to={"/sice/fornecedores"}>
                <Button variant="contained" size="large" color="error" sx={{ textAlign: "center", marginTop: 5 }}>
                    <ReplyIcon sx={{ marginRight: 1, fontSize: "30px" }} /> Voltar
                </Button>
            </Link>

        </Box>


    )


}