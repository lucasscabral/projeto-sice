import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import ModalDeleteItem from "../modal/modalDeleteItem";
import FormEditionProduct from "../form/formEditionProduct";

export default function ButtonActions({
  params,
  productsSelected,
  setProductsSelected,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openFormEdit, setOpenFormEdit] = useState(false);
  const handleOpenFormEdit = () => setOpenFormEdit(true);
  const handleCloseFormEdit = () => setOpenFormEdit(false);

  return (
    <Stack direction="row" alignItems="center" spacing={0}>
      <Tooltip title="Editar" onClick={handleOpenFormEdit}>
        <IconButton aria-label="editar" size="medium" color="primary">
          <AiOutlineForm />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar">
        <IconButton
          aria-label="deletar"
          size="medium"
          color="error"
          onClick={handleOpen}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      {open ? (
        <ModalDeleteItem
          open={open}
          handleClose={handleClose}
          row={params?.row}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
      ) : null}
      {openFormEdit ? (
        <FormEditionProduct
          openFormEdit={openFormEdit}
          handleCloseFormEdit={handleCloseFormEdit}
          row={params?.row}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
      ) : null}
    </Stack>
  );
}
