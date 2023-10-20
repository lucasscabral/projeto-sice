import { Box } from "@mui/material"
import ImagemDeFundo from "../../assets/imagem-supermercado.jpg"
import PlanoDeFundoContainer from "../../assets/plano-fundo-y.jpg"
import { useState } from "react";

export default function IndexAuth(props) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#0083B0", width: "100%", height: "100vh", backgroundImage: `url(${PlanoDeFundoContainer})` }}>
            <Box sx={{ display: "flex", boxShadow: '0px 0px 5px 3px rgba(0,0,0,0.66)', borderRadius: 5, maxHeight: "650px" }}>
                <Box sx={{ borderRadius: 5, width: "1000px" }}>
                    <img src={ImagemDeFundo} style={{ height: "100%", borderRadius: "20px 0 0 20px", width: "100%" }} />
                </Box>
                <>{props.children}</>
            </Box>
        </Box >
    )
}