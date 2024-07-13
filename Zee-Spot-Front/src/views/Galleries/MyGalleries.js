import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, IconButton  } from '@mui/material'
import galleryService from "../../api/galleryService";
import imageService from "../../api/imageService";
import FirstGalleryBG from '../../assets/img/FirstGalleryBG.png'
import GalleryCard from '../../components/galleries/PreviewGalleryCard'
import CreateGalleryCard from '../../components/galleries/CreateGalleryCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function MyGalleries(){
    const [galleries, setGalleries] = useState();
    const [selectedGalleries, setSelectedGalleries] = useState({});

    useEffect(() => {
        galleryService.get_galleries_by_user(localStorage.getItem('access_token'), (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGalleries(jsonRes)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }, [])

    const handleToggleSelect = (id) => {
        setSelectedGalleries((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    const deleteSelectedGalleries = async () => {
        const access_token = localStorage.getItem('access_token');
        const selectedGalleryTokens = Object.keys(selectedGalleries)
            .filter(key => selectedGalleries[key])
            .map(id => {
                const gallery = galleries.find(gallery => gallery.id.toString() === id);
                return { accessToken: gallery.accessToken, images: gallery.images };
            });
    
        // Delete images for each selected gallery
        for (let { accessToken, images } of selectedGalleryTokens) {
            for (let imageUrl of images) {
                const imageId = imageUrl.split('/').pop(); // Extract the image ID from the URL
                await imageService.delete_image(access_token, imageId);
            }
    
            // Delete the gallery itself
            await galleryService.delete_gallery_by_uid(access_token, accessToken);
        }
    
        const updatedGalleries = galleries.filter(gallery => !selectedGalleries[gallery.id]);
        setGalleries(updatedGalleries);
        setSelectedGalleries({});
    };


    return(
        <Box
            sx={{
                backgroundImage : `url(${FirstGalleryBG})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover',
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

                {/* <Box gap={3} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {galleries?.map((gallery) => (
                        <GalleryCard key={gallery.id} gallery={gallery} />
                    ))}
                    <CreateGalleryCard />
                </Box> */}

                <Box gap={3} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {galleries?.map((gallery) => (
                        <GalleryCard
                            key={gallery.id}
                            gallery={gallery}
                            isSelected={!!selectedGalleries[gallery.id]}
                            onToggleSelect={() => handleToggleSelect(gallery.id)}
                        />
                    ))}
                    <CreateGalleryCard />
                </Box>

                {Object.values(selectedGalleries).some(isSelected => isSelected) && 
                    <IconButton onClick={deleteSelectedGalleries}>
                    <DeleteOutlineIcon 
                        sx={{   
                            fontSize: '40px',
                            position: 'fixed',
                            top: '58%',
                            right: 39,
                            color: 'black'
                        }}
                    />
                    </IconButton>
                }
            </Container>
        </Box>
    )
}