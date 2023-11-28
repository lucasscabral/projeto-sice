import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
    palette: {
        success: {
            main: "#00A09D",
        },
    },
});

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

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

export default function FormCreateProduct({ open, handleClose, productsOnTheShoppingList, setProductsOnTheShoppingList }) {
    const { data } = useQuery("categorias", () => {
        return instance.get("categoria").then((res) => res.data);
    });
    const [categorie, setCategorie] = useState([]);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [unitaryValue, setUnitaryValue] = useState("");
    const [description, setDescription] = useState();




    function addProductInListShopping() {
        const dataProduct = {
            idprodutos: `00${uuidv4().slice(0, 1)} - Cód. Provisório`,
            nomeproduto: name,
            categoria: categorie.length > 0 ? categorie[0]?.idCategoria : "",
            quantidade: quantity,
            vencimento: dueDate,
            valor_unitario: unitaryValue,
            descricao: description ? description : "Sem descrição do produto",
        };

        setProductsOnTheShoppingList([...productsOnTheShoppingList, { ...dataProduct }])
        handleClose()
    }

    const handleChange = (event) => {
        setCategorie((categorie.length = 0));
        const dataCategory = {
            idCategoria: event.target.value.idCategoria,
            nomecategoria: event.target.value.nomecategoria,
        };
        setCategorie([...categorie, dataCategory]);
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
                        <CloseIcon
                            sx={{ fontSize: 40, cursor: "pointer" }}
                            onClick={handleClose}
                        />
                        <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>
                            Adcionar Novo Produto
                        </Typography>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 25,
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Nome"
                            variant="outlined"
                            required
                            sx={{ width: 400 }}
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            type="number"
                            required
                            label="Quantidade"
                            variant="outlined"
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(event.target.value);
                            }}
                        />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: 20,
                            gap: 20,
                        }}
                    >
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                                value={categorie[0]?.nomecategoria}
                                label="Categoria"
                                onChange={handleChange}
                            >
                                {data?.map((categoria) => (
                                    <MenuItem key={categoria.idCategoria} value={categoria}>
                                        {categoria.nomecategoria}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="Data de Vencimento"
                            required
                            type="date"
                            focused
                            variant="outlined"
                            sx={{ width: 400 }}
                            value={dueDate}
                            onChange={(event) => {
                                setDueDate(event.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            required
                            label="Valor Unitário"
                            variant="outlined"
                            sx={{ width: 400 }}
                            value={unitaryValue}
                            onChange={(event) => {
                                setUnitaryValue(event.target.value);
                            }}
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Descrição"
                            variant="outlined"
                            multiline
                            minRows={2}
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                    </div>

                    <ButtonsActions>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={handleClose}
                        >
                            {" "}
                            X Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={addProductInListShopping}
                        >
                            <CheckIcon /> Salvar
                        </Button>
                    </ButtonsActions>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

const ButtonsActions = styled.div`
    display: flex;
    justify-content: space-between;
  `;
