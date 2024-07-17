import React from "react";
import { Box } from "@mui/material";
import MyAccountBG from "../assets/img/MyAccountBG.png"
import MyAccountPersoInfo from "../assets/img/MyAccount_private-info_Card.png"
import MyAccountProInfo from "../assets/img/MyAccount_professional-info_Card.png"
import MyAccountPreferences from "../assets/img/MyAccount_preferences_Card.png"
import MyAccountPic from "../assets/img/MyAccountPic.png"

export default function Account(){
    return(
        <Box
            sx={{
                height: `calc(100vh - 204px)`,
                backgroundImage : `url(${MyAccountBG})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover',
                bgcolor: 'info.main',
            }}    
        >
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                }}
                pt={3}
            >
                <img width={'20%'} height={'20%'} sx={{}} src={MyAccountPersoInfo} />
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <img width={'40%'} height={'40%'} src={MyAccountPic} />
                    <img width={'60%'} height={'60%'} src={MyAccountPreferences} />
                </Box>
                <img width={'20%'} height={'20%'} src={MyAccountProInfo} />
            </Box>
        </Box>
    )
}