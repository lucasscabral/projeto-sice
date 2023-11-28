import { useState, forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Tooltip,
  Divider,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import TableProducts from "./table/tableProducts";
import FormSelectionProduct from "./form/formSelectionProduct";
import ModalCancelPurchase from "./modal/modalCancelPurchase";
import { useMutation } from "react-query";
import ButtonActions from "./table/buttonsActions";
import instance from "../../axios/instanceAxios";
import { Notify } from "notiflix";
import useContextApi from "../../context/useContext";

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

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R$ "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function IndexBox() {
  const [amountToPay, setAmountToPay] = useState();
  const [productsSelected, setProductsSelected] = useState([]);
  const { payload } = useContext(useContextApi);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openModalCancelPurchase, setOpenModalCancelPurchase] = useState(false);
  const handleOpenModalCancelPurchase = () => setOpenModalCancelPurchase(true);
  const handleCloseModalCancelPurchase = () =>
    setOpenModalCancelPurchase(false);

  let calculateInitial = 0;
  const calculateTotal = productsSelected?.reduce(
    (accumulator, currentValue) =>
      accumulator +
      parseInt(currentValue.quantidade) * currentValue.valor_unitario,
    calculateInitial
  );

  const mutation = useMutation({
    mutationFn: () => {
      const dataProduct = {
        itensVenda: productsSelected.map((product) => {
          return {
            quantidade: +product.quantidade,
            idprodutos: +product.idprodutos,
          };
        }),
        formaPagamento: "Dinheiro",
      };

      return instance.post("/venda", dataProduct,
        {
          headers:
          {
            'Authorization': `Bearer ${payload?.access_token}`
          }
        }).then((res) => res.data);
    },
    onSuccess: (_) => {
      Notify.success("Compra realizada com sucesso!");
      let rechargeBox = [];
      setProductsSelected(rechargeBox);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        return Notify.failure(`O funcionário deve estar logado no sistema`)
      } else {
        Notify.failure(`${error.response.data.message}`);
      }
    },
  });

  const columns = [
    { field: "idprodutos", headerName: "Cód. do prod.", width: 150 },
    { field: "nomeproduto", headerName: "Nome", width: 150 },
    { field: "quantidade", headerName: "Qtd.", width: 120, type: "number" },
    {
      field: "valor_unitario",
      headerName: "Val. Uni.",
      type: "number",
      width: 120,
    },
    {
      headerName: "Ações",
      width: 150,
      renderCell: (params) => (
        <ButtonActions
          {...{
            params,
            productsSelected,
            setProductsSelected,
          }}
        />
      ),

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
        <Cabecalho>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Caixa
          </Typography>
          <Tooltip title={"Adicionar um produto ao caixa"}>
            <Button
              variant="contained"
              size="large"
              color="info"
              sx={{ fontWeight: "bold" }}
              onClick={handleOpen}
            >
              + Adicionar
            </Button>
          </Tooltip>
        </Cabecalho>
        <TableProducts rows={productsSelected} columns={columns} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total:R$ {calculateTotal?.toFixed(2)}
            </Typography>
            <Divider variant="fullWidth" color="gray" />
            <Box sx={{ display: "flex", marginTop: 2, gap: 15 }}>
              <TextField
                id="valor-a-pagar"
                label="Valor a pagar"
                variant="outlined"
                required
                disabled={calculateTotal === 0 ? true : false}
                sx={{ width: 200 }}
                value={amountToPay}
                onChange={(event) => {
                  setAmountToPay(event.target.value);
                }}
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
              />
              <Box
                sx={{
                  backgroundColor: "lightgray",
                  padding: "12px 15px",
                  width: 150,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Troco</Typography>
                <Divider
                  variant="fullWidth"
                  color="gray"
                  sx={{ marginBottom: 1 }}
                />
                <span>
                  {amountToPay
                    ? (calculateTotal - parseFloat(amountToPay)).toFixed(2)
                    : 0}
                </span>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={handleOpenModalCancelPurchase}
            >
              X Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={!productsSelected[0] ? true : false}
              size="large"
              onClick={() => mutation.mutate()}
            >
              <CheckIcon />
              Finalizar
            </Button>
          </Box>
        </Box>
      </Box>
      {open ? (
        <FormSelectionProduct
          open={open}
          handleClose={handleClose}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
      ) : null}
      {openModalCancelPurchase ? (
        <ModalCancelPurchase
          openModalCancelPurchase={openModalCancelPurchase}
          handleCloseModalCancelPurchase={handleCloseModalCancelPurchase}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
          setAmountToPay={setAmountToPay}
        />
      ) : null}
    </ThemeProvider>
  );
}

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10;
`;
