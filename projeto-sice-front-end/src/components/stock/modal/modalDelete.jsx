import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import instance from "../../../axios/instanceAxios";
import { Loading, Notify } from "notiflix";
import { useMutation } from "react-query";

export default function ModalDelete({
    handleClose,
    open,
    rowId,
    refetch,
    modification,
    setModification,
}) {
    const mutation = useMutation({
        mutationFn: ({ rowId }) => {
            return instance.delete(`produtos/${rowId}`).then(res => res.data)
        },
        onSuccess: (_) => {
            refetch()
            Notify.success("Excluído com sucesso!");
            handleClose()
        },
        onError: (_) => {
            Notify.failure("Não foi possível excluir esse produto!");
            handleClose();
        }
    })

    if (mutation.isLoading) {
        Loading.standard('Carregando...');
        Loading.remove()
    }

    return (
        <Modal
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Excluir Produto
                </Typography>
                <Typography
                    id="keep-mounted-modal-description"
                    variant="subtitle1"
                    component="h2"
                    sx={{ mt: 2, color: "#CD3D3F", fontSize: 17 }}
                >
                    {`Tem certeza que deseja excluir o produto Nº ${rowId}?`}
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
                        onClick={() => mutation.mutate({ rowId })}
                    >
                        Sim
                    </Button>
                    <Button
                        color="warning"
                        size="large"
                        variant="outlined"
                        sx={{ borderRadius: 20, width: 100 }}
                        onClick={handleClose}
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