import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";

export default function Footer(){
    return(
        <Box 
            sx={{ 
                width: '100%', 
                height: '100px', 
                bgcolor: 'secondary.main', 
                borderTop: 4,
                borderColor: 'primary.main',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                '& .MuiTypography-root':{
                    color:'primary.main',
                }, 
            }}
        >
            <Typography variant="h5">Copyright @ 2024 ZEE-SPOT. Tous droits réservés.</Typography>
            <Link to={routes.CGU} style={{textDecoration: 'none'}}><Typography variant="h5">Conditions d'utilisations</Typography></Link>
            <Typography variant="h5">Politique de confidentialité</Typography>
        </Box>
    )
}