import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import FirstGalleryBG from '../../assets/img/FirstGalleryBG.png'
import GalleryCard from '../../components/galleries/PreviewGalleryCard'
import CreateGalleryCard from '../../components/galleries/CreateGalleryCard'

export default function MyGalleries(){
    return(
        <Box
            sx={{
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

                <Box gap={3} sx={{display: 'flex'}}>
                    <GalleryCard />
                    <CreateGalleryCard />
                </Box>

                <Box></Box>

            </Container>
        </Box>
    )
}