import { useState } from "react";
import { Box, Button, Modal, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import styled from "styled-components";

const theme = createTheme({
    palette: {
        success: {
            main: '#00A09D'
        }
    }
})
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};


export default function FormEditionProduct({ openFormEdit, handleCloseFormEdit, row, productsSelected, setProductsSelected }) {

    const [quantity, setQuantity] = useState();
    function updateQuantityProduct() {
        const productsUpdated = productsSelected.map(value => value.idprodutos === row.idprodutos ? { ...value, quantidade: quantity } : value)
        setProductsSelected(productsSelected = productsUpdated);
        handleCloseFormEdit();
    }


    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={openFormEdit}
                onClose={handleCloseFormEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
                        <CloseIcon sx={{ fontSize: 40, cursor: "pointer" }} onClick={handleCloseFormEdit} />
                        <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>Editar Produto</Typography>
                    </div>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid gray", marginBottom: 4, borderRadius: 1, padding: 5, width: "100%", height: 150 }}>
                        <TextField
                            disablePortal
                            id="list-products"
                            disabled
                            value={row?.nomeproduto}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Produtos" />}
                        />
                        <TextField
                            id="quantidade"
                            label="Quantidade"
                            variant="outlined"
                            type='number'
                            required
                            sx={{ width: 200 }}
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(event.target.value);
                            }}
                        />
                    </Box>
                    <ButtonsActions>
                        <Button variant="contained" color="error" size="large" onClick={handleCloseFormEdit}> X Cancelar</Button>
                        <Button variant="contained" color="success" disabled={!quantity ? true : false} size="large" onClick={updateQuantityProduct}><CheckIcon /> Salvar</Button>
                    </ButtonsActions>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}


const ButtonsActions = styled.div`
    display: flex;
    justify-content: space-between;
`