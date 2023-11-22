import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function ModalDeleteItem({
  handleClose,
  open,
  row,
  productsSelected,
  setProductsSelected,
}) {
  function findIndex(list, obj) {
    return list.filter((value) => value.idprodutos !== obj.idprodutos);
  }
  function removeFromCashier() {
    setProductsSelected((productsSelected = findIndex(productsSelected, row)));
    handleClose();
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
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Excluir Produto
        </Typography>
        <Typography
          id="keep-mounted-modal-description"
          variant="subtitle1"
          component="h2"
          sx={{ mt: 2, color: "#CD3D3F", fontSize: 17 }}
        >
          {`Tem certeza que deseja retirar o produto Nº ${row.idprodutos} das suas compras?`}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={4} sx={{ mt: 5 }}>
          <Button
            color="success"
            size="large"
            variant="outlined"
            sx={{ borderRadius: 20, width9: 100 }}
            onClick={removeFromCashier}
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
