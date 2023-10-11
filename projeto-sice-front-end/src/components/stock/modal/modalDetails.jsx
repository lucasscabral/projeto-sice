import { Box, Modal, ThemeProvider, Typography, createTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from "react-query";
import instance from "../../../axios/instanceAxios";
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

const getProductById = async (id) => {
    const { data } = await instance.get(`produtos/${id}`);
    return data;
};


export default function ModalDetails({ openModalDetails, handleCloseModalDetails, rowId }) {
    const { data } = useQuery(["produto", rowId], async () => await getProductById(rowId));

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={openModalDetails}
                onClose={handleCloseModalDetails}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div style={{ width: "100%", display: "flex", marginBottom: 25 }}>
                        <CloseIcon sx={{ fontSize: 40, cursor: "pointer" }} onClick={handleCloseModalDetails} />
                        <Typography fontWeight={"bold"} fontSize={35} marginLeft={25}>Descrição do Produto Nº {rowId}</Typography>
                    </div>
                    <Box sx={{ border: "1px solid gray", borderRadius: 1, padding: 1, width: "100%", height: 300 }}>
                        <Typography variant="h6"> {data?.descricao}</Typography>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}
