import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuPopupState from './board';
import instance from '../../axios/instanceAxios';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `100%`,
        height: "80px",
        background: "#E6643A",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function IndexHeader() {
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <MenuPopupState />
                    <Typography variant="h4" fontFamily={'fantasy'} sx={{ textShadow: "0px 2px rgba(0,0,0,0.50)" }} noWrap component="div">
                        SICE
                    </Typography>
                    <div>lOGIN</div>
                </Toolbar>
            </AppBar>
        </>
    );
}