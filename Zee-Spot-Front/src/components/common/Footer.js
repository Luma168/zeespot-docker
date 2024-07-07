import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        // <BottomNavigation 
        //     sx={{ 
        //         width: '100%', 
        //         height: '100px', 
        //         bgcolor: 'secondary.main', 
        //         borderTop: 4,
        //         borderColor: 'primary.main',
        //         '& .MuiButtonBase-root':{
        //             fontWeight:'bold',
        //             color:'primary.main',
        //             mx: 10,
        //             minWidth: '400px',
        //             borderRadius:'50px'
        //         }, 
        //         '& .MuiBottomNavigationAction-label':{
        //             fontSize: '15px'
        //         }
        //     }}
        // >
        //     <BottomNavigationAction 
        //         label="Copyright @ 2024 ZEE-SPOT. Tous droits réservés."
        //         showLabel 
        //         value="Copyright" 
        //     >
        //     </BottomNavigationAction>
        //     <BottomNavigationAction 
        //         label="Conditions d'utilisations"
        //         showLabel 
        //         value="Copyright" 
        //     >
        //     </BottomNavigationAction>
        //     <BottomNavigationAction 
        //         label="Politique de confidentialité"
        //         showLabel 
        //         value="Copyright" 
        //         >
        //     </BottomNavigationAction>
        // </BottomNavigation>
        
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
                    // fontWeight:'bold',
                    color:'primary.main',
                    // mx: 10,
                    // minWidth: '400px',
                    // borderRadius:'50px'
                }, 
            }}
        >
            <Typography variant="h5">Copyright @ 2024 ZEE-SPOT. Tous droits réservés.</Typography>
            <Link style={{textDecoration: 'none'}}><Typography variant="h5">Conditions d'utilisations</Typography></Link>
            <Link style={{textDecoration: 'none'}}><Typography variant="h5">Politique de confidentialité</Typography></Link>
        </Box>
    )
}