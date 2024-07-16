import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, IconButton, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import galleryService from "../../api/galleryService";
import imageService from "../../api/imageService";
import FirstGalleryBG from '../../assets/img/FirstGalleryBG.png'
import GalleryCard from '../../components/galleries/PreviewGalleryCard'
import CreateGalleryCard from '../../components/galleries/CreateGalleryCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SadCloud from '../../assets/img/SadCloud2.png'


export default function MyGalleries(){
    const [galleries, setGalleries] = useState();
    const [selectedGalleries, setSelectedGalleries] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const [openDialog, setOpenDialog] = useState(false); // Dialog state

    useEffect(() => {
        galleryService.get_galleries_by_user(localStorage.getItem('access_token'), (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGalleries(jsonRes)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
            setLoading(false);
        });
    }, [])

    const handleDeleteGallery = async (accessToken) => {
        const access_token = localStorage.getItem('access_token');
        await galleryService.delete_gallery_by_uid(access_token, accessToken);

        const updatedGalleries = galleries.filter(gallery => gallery.accessToken !== accessToken);
        setGalleries(updatedGalleries);

        // Update the selectedGalleries state to remove the deleted gallery
        setSelectedGalleries(prevSelected => {
            const newSelected = { ...prevSelected };
            const galleryId = galleries.find(gallery => gallery.accessToken === accessToken).id;
            delete newSelected[galleryId];
            return newSelected;
        });
    };

    const handleToggleSelect = (id) => {
        setSelectedGalleries((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
        handleCloseDialog()
    };

    const renderLoaders = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <Grid item key={index}>
                <Box
                    sx={{
                        width: '300px', height: '250px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'grey.300',
                        borderRadius: '4px'
                    }}
                >
                    <CircularProgress />
                </Box>
            </Grid>
        ));
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

                <Box gap={3} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {loading ? (
                        renderLoaders(galleries? galleries.length : 2) // Display 8 loaders as placeholders
                    ) : galleries.length === 0 ? (
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography 
                                variant='h2b'
                                mb={4}
                            >
                                C'est un peu vide ici non ?!
                            </Typography>
                            <Box>
                                <img src={SadCloud} height={200}/>
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
                            </Box>
                            <CreateGalleryCard />
                        </Box>
                    ) : (
                        <>
                            {galleries.map((gallery) => (
                                <GalleryCard
                                    key={gallery.id}
                                    gallery={gallery}
                                    isSelected={!!selectedGalleries[gallery.id]}
                                    onToggleSelect={() => handleToggleSelect(gallery.id)}
                                    onDelete={handleDeleteGallery}
                                />
                            ))}
                            <CreateGalleryCard />
                        </>
                    )}

                </Box>

                {Object.values(selectedGalleries).some(isSelected => isSelected) && 
                    <IconButton onClick={handleOpenDialog}>
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

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmation de la suppression"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Êtes-vous sûr de vouloir supprimer ces galleries?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={deleteSelectedGalleries} color="primary" autoFocus>
                            Confirmer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}