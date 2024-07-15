import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Button, ButtonGroup, Toolbar } from "@mui/material";
import WhiteLogo from '../../../assets/img/logo_zeespot_white.png';
import SignDialogs from "../../SignForms/SignDialogs";
import AvatarMenu from './AvatarMenu';
import routes from "../../../routes/routes";
import SearchBar from "./SearchBar";

export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsConnected(true);
        }
    }, []);

    const handleLogin = () => {
        setIsConnected(true);
    };

    const handleLogout = () => {
        setIsConnected(false);
    };

    return (
        <AppBar
            fullWidth
            position="static"
            sx={{
                position: 'sticky',
                top: '0',
                zIndex: 1000
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    height: '100px',
                    bgcolor: 'secondary.main',
                }}
            >
                <Box sx={{ mr: 'auto' }}>
                    <NavLink to={routes.ALL}>
                        <img src={WhiteLogo} width="170px" alt="Logo" />
                    </NavLink>
                </Box>

                <SearchBar />

                <ButtonGroup
                    sx={{
                        mr: 10,
                        '& .MuiButtonBase-root': {
                            bgcolor: 'primary.main',
                            color: 'secondary.main',
                            fontWeight: 'bold',
                            px: 4,
                            py: 1,
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }
                    }}
                    variant="contained"
                    aria-label="Basic button group"
                >
                    <Button component={NavLink}
                        to={routes.HOME}
                        isActive={(match, location) => location.pathname === routes.HOME}
                        sx={{
                            '&.active': {
                                bgcolor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        Accueil
                    </Button>

                    <Button component={NavLink}
                        to={routes.MY_GALLERIES}
                        isActive={(match, location) => location.pathname === routes.MY_GALLERIES}
                        sx={{
                            '&.active': {
                                bgcolor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        Galeries
                    </Button>

                    <Button component={NavLink}
                        to={routes.TARIFS}
                        isActive={(match, location) => location.pathname === routes.TARIFS}
                        sx={{
                            '&.active': {
                                bgcolor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        Tarifs
                    </Button>
                </ButtonGroup>

                <Box sx={{ mr: '40px' }}>
                    {isConnected ?
                        <AvatarMenu onLogout={handleLogout} />
                        :
                        <SignDialogs onLogin={handleLogin} />
                    }
                </Box>

            </Toolbar>
        </AppBar>
    );
}