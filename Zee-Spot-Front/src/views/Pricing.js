import { Box, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import connectedPricing from '../assets/img/connectedPricing.png'
import disconnectedPricing from '../assets/img/disconnectedPricing.png'

export default function Pricing(){
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsConnected(true);
        }
    }, []);

    return(
        <Box 
            sx={{
                bgcolor: 'info.main',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: `calc(100vh - 204px)`

            }}
        >
                <Box sx={{justifySelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box
                        px={15}
                        py={1}
                        sx={{
                            bgcolor: 'primary.light',
                            boxShadow: 5
                        }}                   
                    >
                        <Typography variant='letter'>T</Typography>
                        <Typography variant='h1b'>ARIFS </Typography>
                    </Box>
                </Box>  

                <img width={'100%'} src={isConnected ? connectedPricing : disconnectedPricing} />

                <Box>
                </Box>
        </Box>
    )
}