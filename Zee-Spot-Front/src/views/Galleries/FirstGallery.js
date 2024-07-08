import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
// import SadCloud from '../../assets/img/svg/SadCloud';
import SadCloud from '../../assets/img/SadCloud2.png'
import NewGallery from '../../assets/img/NewGallery.png'
import FirstGalleryBG from '../../assets/img/FirstGalleryBG.png'

import routes from '../../routes/routes';


export default function FirstGallery(){

    return(
        <Box 
            sx={{
                // bgcolor: 'info.main',
                backgroundImage : `url(${FirstGalleryBG})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover'
            }}

        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: `calc(100vh - 204px)`,
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box
                        px={7}
                        py={2}
                        sx={{   
                            bgcolor: 'primary.light',
                            boxShadow: 5
                        }}                   
                    >
                        <Typography variant='letter'>M</Typography>
                        <Typography variant='h1b'>ES </Typography>
                        <Typography variant='letter'>G</Typography>
                        <Typography variant='h1b'>ALERIES</Typography>
                    </Box>
                    <Box sx={{
                        width:'300px',      
                        height: '30px',
                        bgcolor: 'secondary.main',
                        boxShadow: 3
                    }}/>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography 
                        variant='h2b'
                        mb={4}
                    >
                        C'est un peu vide ici non ?!
                    </Typography>
                    <Box>
                        {/* <SadCloud /> */}
                        <img src={SadCloud} />
                    </Box>
                    <Box
                        mt={4}
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography 
                            mr={7} 
                            variant='h2b'
                        >
                            Crée ta première galerie !
                        </Typography>
                        <Link to={routes.GALLERY_FORM}>
                            <img width={75} src={NewGallery} />
                        </Link>
                    </Box>
                </Box>
                <Box></Box>
                
            </Container>
        </Box>
    )
}