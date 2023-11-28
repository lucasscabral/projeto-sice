import { Box, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function ScreenEmptyLogin() {
    return (
        <Box
            marginTop={15}
            paddingLeft={10}
            paddingRight={10}
            sx={{ width: "100%", minHeight: 500, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <InfoIcon color="info" sx={{ fontSize: 80, marginBottom: 5 }} />
                Funcionário deve estar logado para prosseguir nas próximas atividades
            </Typography>
        </Box>
    )
}