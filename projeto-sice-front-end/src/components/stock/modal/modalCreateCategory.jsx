import { useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { useMutation } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import instance from "../../../axios/instanceAxios";
import { Notify } from "notiflix";

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

export default function ModalCreateCategory({
    open,
    handleClose,
}) {

    const [category, setCategory] = useState();
    const [description, setDescription] = useState();

    const mutation = useMutation({
        mutationFn: () => {
            const dataCategory = {
                nomecategoria: category,
                descricao: description
            };

            return instance.post("/categoria", dataCategory).then((res) => res.data);
        },
        onSuccess: (_) => {
            Notify.success("Categoria cadastrado realizada com sucesso!");
            handleClose()
        },
        onError: (error) => {
            Notify.failure(`${error.response.data.message}`);
        },
    })


    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-category-title"
                aria-describedby="modal-category-description"
            >
                <Box sx={style}>
                    <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
                        <CloseIcon
                            sx={{ fontSize: 40, cursor: "pointer" }}
                            onClick={handleClose}
                        />
                        <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>
                            Cadastrar Nova Categoria
                        </Typography>
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid gray",
                            marginBottom: 4,
                            borderRadius: 1,
                            gap: 4,
                            padding: 5,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <TextField
                            id="categoria"
                            label="Categoria"
                            variant="outlined"
                            type="text"
                            required
                            sx={{ width: 200 }}
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}
                        />
                        <TextField
                            id="descricao"
                            label="Descrição"
                            variant="outlined"
                            type="text"
                            multiline
                            minRows={2}
                            sx={{ width: "100%" }}
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                    </Box>
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
                            disabled={!category ? true : false}
                            size="large"
                            onClick={() => mutation.mutate()}
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
