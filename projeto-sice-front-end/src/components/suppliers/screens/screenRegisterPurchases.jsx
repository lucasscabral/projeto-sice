import { Autocomplete, Box, Button, ButtonGroup, Divider, TextField, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';
import { useQuery, useMutation } from "react-query";
import instance from "../../../axios/instanceAxios";
import Notiflix, { Notify, Report } from "notiflix";
import { mask } from "remask";
import FormCreateProduct from "../forms/formCreateProduct";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const columns = [{
    field: "idprodutos",
    headerName: "Cód.",
    width: 120,
    disableClickEventBubbling: true,
},
{
    field: "nomeproduto",
    headerName: "Nome",
    width: 210,
    disableClickEventBubbling: true,
},
{
    field: "valor_unitario",
    headerName: "Val. Uni.",
    width: 150,
    disableClickEventBubbling: true,
    valueGetter: (params) => {
        return `R$ ${parseFloat(params?.row.valor_unitario).toFixed(2)}`
    }
},
{
    field: "quantidade",
    headerName: "Quantidade",
    width: 200,
    disableClickEventBubbling: true,
},
{
    field: "descricao",
    headerName: "Descrição",
    width: 200,
    disableClickEventBubbling: true,
},
]

const theme = createTheme({
    palette: {
        info: {
            main: '#00A09D'
        }
    }
})

const MASK_QUANTITY = ["99999999999"]


export default function ScreenRegisterPurchases() {
    const [supplier, setSupplier] = useState();
    const [productsSupplier, setProductsSupplier] = useState([]);
    const [selectedProductFromSupplier, setSelectedProductFromSupplier] = useState();
    const [productsOnTheShoppingList, setProductsOnTheShoppingList] = useState([]);
    const [quantity, setQuantity] = useState();
    const { data } = useQuery("fornecedores", () => { return instance.get("/fornecedores").then((res) => res.data) })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let calculateInitial = 0;
    const calculateTotal = productsOnTheShoppingList?.reduce(
        (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.quantidade) * currentValue.valor_unitario, calculateInitial
    );

    const mutation = useMutation({
        mutationFn: () => {
            const dataListPurchases = {
                itensCompra: productsOnTheShoppingList.map((product) => {
                    return {
                        ...product,
                        categoria: product.Categoria_idCategoria ? product.Categoria_idCategoria : product.categoria,
                        quantidade: +product.quantidade,
                        idprodutos: typeof (product.idprodutos) === "string" ? +product.idprodutos.slice(0, 1) : product.idprodutos,
                        valor_unitario: parseFloat(product.valor_unitario).toFixed(2)
                    };
                }),
                idfornecedor: +supplier.idfornecedor,
            };
            return instance.post("/fornecedores/registrar-compras", dataListPurchases).then((res) => res.data);
        },
        onSuccess: (_) => {
            Report.success(
                'Compra Realizada com Sucesso!',
                'Finalizada com êxito',
                'OK'
            );
            let rechargePurchase = [];
            setProductsOnTheShoppingList(rechargePurchase);
            setQuantity("")
        },
        onError: (error) => {
            Notify.failure(`${error.response.data.message}`);
        },
    });
    useEffect(() => {
        const promise = instance.get(`/fornecedores/${supplier?.idfornecedor}`)
        promise.then((res) => {
            setProductsSupplier(res.data)
        }).catch((_) => {
            Notiflix.Notify.failure("Erro Inesperado")
        })
    }, [supplier])

    function addListShopping() {
        setProductsOnTheShoppingList([...productsOnTheShoppingList, { ...selectedProductFromSupplier, quantidade: +quantity }])
    }


    return (
        <ThemeProvider theme={theme}>
            <Box paddingLeft={10} paddingTop={10} paddingRight={10} sx={{ width: "100%", background: "#f0f0f0", height: "100%" }}>
                < Box paddingLeft={10} paddingRight={10} paddingTop={5} sx={{ width: "100%", background: "#fff", height: "100%", border: "1px solid black" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>Registrar Compras</ Typography>
                    <Box marginTop={5} sx={{ display: "flex", gap: 5 }}>
                        <Autocomplete
                            disablePortal
                            id="input-fornecedores"
                            value={supplier?.nomefornecedor}
                            onChange={(_, newValue) => {
                                setSupplier(newValue);
                            }}
                            options={data}
                            disabled={productsOnTheShoppingList.length > 0 ? true : false}
                            getOptionLabel={(option) => option?.nomefornecedor}
                            noOptionsText="Fornecedor não encontrado"
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Fornecedores" />}
                        />
                        {productsSupplier?.length > 0 ?
                            <Box sx={{ display: "flex", gap: 3 }}>
                                <Autocomplete
                                    disablePortal
                                    id="input-produtos-fornecedor"
                                    value={selectedProductFromSupplier?.nomeproduto}
                                    onChange={(_, newValue) => {
                                        setSelectedProductFromSupplier(newValue);
                                    }}
                                    options={productsSupplier}
                                    getOptionLabel={(option) => option?.nomeproduto}
                                    noOptionsText="Produto não encontrado"
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Produtos" />}
                                />
                                <TextField
                                    type="text"
                                    label="Qtd." sx={{ width: 100 }}
                                    variant="outlined"
                                    value={quantity}
                                    onChange={(event) => {
                                        setQuantity(mask(event.target.value, MASK_QUANTITY));
                                    }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, flexDirection: "row" }}>
                                    <Tooltip title="Cancelar produto">
                                        <Button variant="contained" size="large" color="error" onClick={() => {
                                            setQuantity("")
                                        }}>Cancelar</Button>
                                    </Tooltip>
                                    <Tooltip title="Adicionar produto a lista de compras">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            disabled={!quantity || !selectedProductFromSupplier ? true : false}
                                            color="info"
                                            onClick={addListShopping}>
                                            Adicionar
                                        </Button>
                                    </Tooltip>
                                </Box>
                            </Box> : null

                        }
                        <Tooltip title="Cadastrar novo produto">
                            <Button
                                variant="contained"
                                size="large"
                                color="success"
                                disabled={!supplier ? true : false}
                                onClick={handleOpen}>Cadastrar Produto</Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ height: 400, width: '100%', marginTop: 3 }}>
                        <DataGrid
                            rows={productsOnTheShoppingList}
                            columns={columns}
                            getRowId={(rows) => rows.idprodutos}
                            disableRowSelectionOnClick
                            disableColumnMenu
                            getEstimatedRowHeight={() => 100}
                            getRowHeight={() => "auto"}
                            key={productsOnTheShoppingList}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 5, marginBottom: 5 }}>
                        <Box>
                            <Link to={"/sice/fornecedores"}>
                                <Button variant="contained" size="large" color="error" sx={{ textAlign: "center", marginTop: 3, marginBottom: 5 }} >
                                    <ReplyIcon sx={{ marginRight: 1, fontSize: "30px" }} /> Voltar
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ minWidth: 300, minHeight: 130 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>Total</Typography>
                            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                            <Typography variant="h5">R$ {calculateTotal}</Typography>
                        </Box>
                        <Box >
                            <ButtonGroup orientation="vertical" size="large" sx={{ gap: 5 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => setProductsOnTheShoppingList([])}
                                >
                                    <CloseIcon color="white" sx={{ marginRight: 2, fontSize: 30 }} /> Cancelar Compra
                                </Button>
                                <Button
                                    variant="contained"
                                    color="info"
                                    disabled={productsOnTheShoppingList.length > 0 ? false : true}
                                    onClick={() => mutation.mutate()}
                                >
                                    <DoneIcon color="white" sx={{ marginRight: 2, fontSize: 30 }} />Finalizar Compra
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    {open ? <FormCreateProduct
                        open={open}
                        handleClose={handleClose}
                        productsOnTheShoppingList={productsOnTheShoppingList}
                        setProductsOnTheShoppingList={setProductsOnTheShoppingList}
                    /> : null}
                </Box >
            </Box >
        </ThemeProvider >
    )


}