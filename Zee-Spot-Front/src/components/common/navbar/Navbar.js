import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, ButtonGroup, Toolbar} from "@mui/material";
import WhiteLogo from '../../../assets/img/logo_zeespot_white.png'
import SignDialogs from "../../SignForms/SignDialogs";
import AvatarMenu from './AvatarMenu'
import routes from "../../../routes/routes";

export default function Navbar(){
    const [isConnected, setIsConnected] = useState(false)

    // constante temporaire pour test routes    
    const [galleryCount, setGalleryCount] = useState(1)

    return(
        <AppBar 
            fullWidth 
            position="static" 
            sx={{
                position:'sticky',
                top:'0',
                zIndex: 1000
            }}
            
        >
            <Toolbar 
                sx={{
                    display:'flex', 
                    height:'100px',
                    bgcolor:'secondary.main',
                }}
            >
                <Box sx={{mr:'auto'}}>
                    <Link to={routes.ALL}>
                        <img src={WhiteLogo} width="170px"/>
                    </Link>
                </Box>

                {/* Remplacer par ??? */}
                <ButtonGroup 
                    sx={{
                        mr: 10,
                        '& .MuiButtonBase-root':{
                            bgcolor:'primary.main', 
                            color:'secondary.main', 
                            fontWeight:'bold',
                            px: 4,
                            py: 1,
                            '&:hover': {backgroundColor: 'primary.dark'},
                        }
                    }} 
                    variant="contained" 
                    aria-label="Basic button group"
                >
                    <Link to={routes.HOME}>
                        <Button>Accueil</Button>
                    </Link>
                    {
                        galleryCount ?
                        <Link to={routes.MY_GALLERIES}>
                            <Button>Galeries</Button>
                        </Link>
                        :
                        <Link to={routes.FIRST_GALERIE}>
                            <Button>Galeries</Button>
                        </Link>

                    }
                    <Link>
                        <Button>Tarifs</Button>
                    </Link>
                </ButtonGroup>

                {/* utiliser Mui Account Menu */}
                <Box sx={{mr:'40px'}}>
                    {
                    isConnected ? 
                    <AvatarMenu />
                    :
                    <SignDialogs />
                    }
                </Box>

            </Toolbar>
        </AppBar>
    )
}