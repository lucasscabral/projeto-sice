import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDelete from "./modal/modalDelete";


export default function ButtonActions({
    params,
    refetch,
    modification,
    setModification,
}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getRowSelectedOfLocalStorage = localStorage.getItem("rowSelected");
    const parseRowSelected = JSON.parse(getRowSelectedOfLocalStorage);

    const onClick = (_) => {
        const currentRow = params.row;
        navigate(`/dashboard/pescadores/editar/${currentRow?.idprodutos}`);
    };
    return (
        <Stack direction="row" alignItems="center" spacing={0}>
            <Tooltip title="Editar" onClick={onClick}>
                <IconButton aria-label="editar" size="medium" color="primary">
                    <Create fontSize="inherit" />
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
                    handleClose={handleClose}
                    open={open}
                    rowId={parseRowSelected?.row.idprodutos}
                    refetch={refetch}
                    modification={modification}
                    setModification={setModification}
                />
            ) : null}
        </Stack>
    );
}



