import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ModalDelete from "./modal/modalDelete";
import { AiOutlineInfoCircle, AiOutlineForm } from "react-icons/ai";
import FormEditionProduct from "./forms/formEditionProduct";
import ModalDetails from "./modal/modalDetails";

export default function ButtonActions({
    _,
    refetch,
    modification,
    setModification,
}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openFormEdit, setOpenFormEdit] = useState(false);
    const handleOpenFormEdit = () => setOpenFormEdit(true);
    const handleCloseFormEdit = () => setOpenFormEdit(false);

    const [openModalDetails, setOpenModalDetails] = useState(false);
    const handleOpenModalDetails = () => setOpenModalDetails(true);
    const handleCloseModalDetails = () => setOpenModalDetails(false);

    const getRowSelectedOfLocalStorage = localStorage.getItem("rowSelected");
    const parseRowSelected = JSON.parse(getRowSelectedOfLocalStorage);

    return (
        <Stack direction="row" alignItems="center" spacing={0}>
            <Tooltip title="Ver Descrição" onClick={handleOpenModalDetails}>
                <IconButton aria-label="visualizar" size="medium" color="primary">
                    <AiOutlineInfoCircle color="#D9430D" />
                </IconButton>
            </Tooltip>
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
                <ModalDelete
                    open={open}
                    handleClose={handleClose}
                    rowId={parseRowSelected?.row.idprodutos}
                    refetch={refetch}
                    modification={modification}
                    setModification={setModification}
                />
            ) : null}
            {openFormEdit ? (
                <FormEditionProduct
                    openFormEdit={openFormEdit}
                    handleCloseFormEdit={handleCloseFormEdit}
                    rowId={parseRowSelected?.row.idprodutos}
                    refetch={refetch} />
            ) : null}
            {openModalDetails ? (
                <ModalDetails
                    openModalDetails={openModalDetails}
                    handleCloseModalDetails={handleCloseModalDetails}
                    rowId={parseRowSelected?.row.idprodutos} />
            ) : null
            }
        </Stack>
    );
}



