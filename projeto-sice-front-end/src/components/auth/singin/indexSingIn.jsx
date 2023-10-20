import { Box, Typography, TextField, FormControl, Button } from "@mui/material"
import { mask } from "remask";
import { useState } from "react";
import { Link } from "react-router-dom";

const MASK_INPUT_CPF = ["999.999.999-99"];

export default function IndexSingIn() {
    const [name, setName] = useState()
    const [cpf, setCpf] = useState()


    return (
        <Box sx={{ gap: 5, width: "100%", borderRadius: "0 20px 20px 0", backgroundColor: 'white', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} >
            <Typography variant="h4" fontFamily={'fantasy'} sx={{ color: "GrayText", textShadow: "0px 2px rgba(0,0,0,0.50)" }} noWrap component="div">
                SICE
            </Typography>
            <Typography variant="subtitle1" component="div">
                Faça login na sua conta
            </Typography>
            <FormControl sx={{ gap: 5 }} >
                <TextField label="Nome do Funcionário" sx={{ minWidth: 280 }} value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="CPF do Funcionário" sx={{ minWidth: 280 }} value={cpf} onChange={(e) => setCpf(mask(e.target.value, MASK_INPUT_CPF))} />

                <Button variant="contained" size="large">Login</Button>
                <Link to={"/singnUp"}>
                    <Typography>Ainda não possui uma conta? Cadastre-se aqui!</Typography>
                </Link>
            </FormControl>
        </Box>
    )
}