import { Box, Divider, ThemeProvider, Typography, createTheme } from "@mui/material";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import styled from "styled-components";


const theme = createTheme({
    palette: {
        info: {
            main: '#00A09D'
        }
    }
})


export default function IndexHome() {
    return (
        <ThemeProvider theme={theme}>
            <Box >
                <Box marginTop={15} paddingLeft={10} paddingRight={10} sx={{ width: "100%" }}>
                    <Cabecalho>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Tela do Funcionário</ Typography>
                    </Cabecalho>
                </Box>
                <Divider variant="fullWidth" sx={{ background: "black", marginTop: 4 }} />
                <Box padding={5} sx={{ width: "100%", background: "#f0f0f0", height: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", background: "#fff", border: "1px solid black" }} padding={10}>
                        <Box sx={{ background: "#fff" }}>
                            <Typography variant="h4" fontWeight="bold">Lucas Cabral</Typography>
                            <Divider variant="fullWidth" sx={{ background: "black", marginTop: 2, marginBottom: 2 }} />
                            <Typography variant="h5" fontWeight="bold">Informações de Contato</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography variant="h6" fontWeight="bold">Telefone: </Typography>
                                <Box sx={{ textAlign: "center", p: 1 }}>0000-0000</Box>
                            </Box>
                            <Typography variant="h6" fontWeight="bold" marginTop={3}>Id: <span style={{ color: "black", fontWeight: "normal" }}>1</span></Typography>
                            <Typography variant="h6" fontWeight="bold" marginTop={3}>Cargo:<span style={{ color: "black", fontWeight: "normal" }}> cargo</span></Typography>
                        </Box>
                        <Box>
                            <AccountBoxOutlinedIcon sx={{ fontSize: "150px" }} />
                        </Box>
                    </Box>

                </Box>
            </Box>
        </ThemeProvider>
    )
}


const Cabecalho = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10;
`