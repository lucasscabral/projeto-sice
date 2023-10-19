import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function ModalCancelPurchase({
    openModalCancelPurchase,
    handleCloseModalCancelPurchase,
    productsSelected,
    setProductsSelected,
    setAmountToPay
}) {
    return (
        <Modal
            open={openModalCancelPurchase}
            keepMounted
            onClose={handleCloseModalCancelPurchase}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Cancelar Compras
                </Typography>
                <Typography
                    id="keep-mounted-modal-description"
                    variant="subtitle1"
                    component="h2"
                    sx={{ mt: 2, color: "#CD3D3F", fontSize: 17 }}
                >
                    {`Tem certeza que deseja cancelar essa compra?`}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    sx={{ mt: 5 }}
                >
                    <Button
                        color="success"
                        size="large"
                        variant="outlined"
                        sx={{ borderRadius: 20, width9: 100 }}
                        onClick={() => {
                            setAmountToPay("")
                            setProductsSelected([])
                            handleCloseModalCancelPurchase()
                        }}
                    >
                        Sim
                    </Button>
                    <Button
                        color="warning"
                        size="large"
                        variant="outlined"
                        sx={{ borderRadius: 20, width: 100 }}
                        onClick={handleCloseModalCancelPurchase}
                    >
                        Não
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: 500,
    height: 260,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};