import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import galleryService from "../../api/galleryService";
import FirstGalleryBG from '../../assets/img/FirstGalleryBG.png'
import GalleryCard from '../../components/galleries/PreviewGalleryCard'
import CreateGalleryCard from '../../components/galleries/CreateGalleryCard'

export default function MyGalleries(){
    const [galleries, setGalleries] = useState();

    useEffect(() => {
        galleryService.get_galleries_by_user(localStorage.getItem('access_token'), (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGalleries(jsonRes)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }, [])

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
                    {galleries?.map((gallery) => (
                        <GalleryCard key={gallery.id} gallery={gallery} />
                    ))}
                    <CreateGalleryCard />
                </Box>

                <Box></Box>

            </Container>
        </Box>
    )
}