import React, { useEffect, useState } from "react";
import {Box, Typography, IconButton, Grid, Button} from '@mui/material';
import CameraLogo from '../../assets/img/camera-logo.png'
import {ScrollUpButton, ScrollDownButton} from "../../components/common/ScrollButtons";
import { useParams } from 'react-router-dom';
import galleryService from "../../api/galleryService";
import { useAuth } from '../../provider/AuthProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import imageService from "../../api/imageService";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useNavigate } from 'react-router-dom';
import routes from "../../routes/routes";
import GalleryImageCard from '../../components/galleries/GalleryImageCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Gallery(){
    const layout = 'paysage';
    const getPhotoStyle = (photo) => {
        switch (layout) {
          case 'square':
            return { width: '300px', height: '300px' };
          case 'paysage':
            return { width: '400px', height: '225px' };
          case 'portrait':
            return { width: '225px', height: '400px' };
        //   case 'vrac':
        //     const aspectRatio = height / width //???; TROUVER COMMENT AVOIR LE RATIO 
        //     if (aspectRatio > 1.5) return { width: '400px', height: '250px' }; // paysage
        //     if (aspectRatio < 0.75) return { width: '250px', height: '400px' }; // portrait
        //     // return { width: '300px', height: '300px' }; // square
        //   default:
        //     return { width: '300px', height: '300px' };  // square
        }
    };

    const [selectedImages, setSelectedImages] = useState({});
    const handleToggleSelect = (id) => {
        setSelectedImages((prevSelected) => ({
        ...prevSelected,
        [id]: !prevSelected[id],
        }));
    };

    const navigate = useNavigate();
    const { uid } = useParams();    
    const [gallery, setGallery] = useState();
    const [imageDetails, setImageDetails] = useState([])

    useEffect(() => {
        galleryService.get_gallery_by_uid(localStorage.getItem('access_token'), uid, (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGallery(jsonRes)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }, [uid])

    useEffect(() => {
        if (gallery) {
            const fetchImageDetails = async () => {
                const imageDetailsPromises = gallery.images.map((url) =>
                    new Promise((resolve) => {
                        imageService.get_image_name(localStorage.getItem("access_token"), url.substring(4), (statusCode, jsonRes) => {
                            if (200 === statusCode) {
                                resolve(jsonRes);
                            } else {
                                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
                                resolve(null);
                            }
                        });
                    })
                );

                const imageDetailsArray = await Promise.all(imageDetailsPromises);
                const validImageDetails = imageDetailsArray.filter(details => details !== null);
                setImageDetails(validImageDetails);
            };

            fetchImageDetails();
        }
    }, [gallery]);

    function deleteGallery(uid) {
        const access_token = localStorage.getItem('access_token');
        gallery?.images.forEach((image) => {
            imageService.delete_image(access_token, image.substring(12))
        })
        
        galleryService.delete_gallery_by_uid(access_token, uid);

        navigate(routes.HOME)
    }

    const deleteSelectedImages = async () => {
        const access_token = localStorage.getItem('access_token');
        const selectedImageIds = Object.keys(selectedImages).filter(key => selectedImages[key]);

        for (let index of selectedImageIds) {
            const imageDetail = imageDetails[index];
            if (imageDetail) {
                await imageService.delete_image(access_token, imageDetail.id);
            }
        }

        const updatedGalleryImages = gallery.images.filter((url, index) => !selectedImages[index]);
        setGallery(prevGallery => ({
            ...prevGallery,
            images: updatedGalleryImages
        }));

        const updatedImageDetails = imageDetails.filter((_, index) => !selectedImages[index]);
        setImageDetails(updatedImageDetails);
        setSelectedImages({});
    };


    return(
        <Box bgcolor="info.main">

            {/* Gallery info */}
            <Box 
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}
            >
                <Box 
                    component='img' 
                    src={CameraLogo}
                    alt="logo du photographe"
                    width={200}
                    mt={5}
                    ml={5}
                />

                {/* Gallery info (title, date)  */}
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        textAlign: 'center',
                        bgcolor: 'primary.main',
                        width: '50%',
                        height: '150px',
                        boxShadow: 3
                    }}
                >
                    <Box>
                        <Typography variant="h3b">{gallery ? gallery.titre : ""}</Typography>
                        <Typography variant="h3">{gallery ? dayjs(gallery.date).format('D MMMM, YYYY') : ""}</Typography>
                        {/* <Typography variant="h3b">Mariage : Mon mariage</Typography>
                        <Typography variant="h3">05/05/2024</Typography> */}
                    </Box>
                    <IconButton 
                        onClick={() => deleteGallery(uid)}
                        sx={{ 
                            color: 'info.main', 
                            '&:hover': {
                                bgcolor: 'primary.light'
                            }
                        }} 
                    >
                        <DriveFileRenameOutlineRoundedIcon 
                            sx={{
                                color: 'black', 
                                // bgcolor: 'primary.light', 
                                fontSize: '60px', 
                                borderRadius: '15px',
                                
                            }} 
                        />
                    </IconButton>
                </Box>
            </Box>

            {/* Pictures display */}
            {/* <Box sx={{display: 'flex'}}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    <Grid container spacing={3} my={10} ml={5}>
                        {photos.map((photo) => (
                            <Grid item>
                                <GalleryImageCard img={photo} layout={getPhotoStyle(photo)} areSelected={areSelected}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box 
                    sx={{width: '10%'}}/>
            </Box> */}
            
            <Box sx={{display: 'flex'}}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    {/* <Grid container spacing={3} my={10} ml={5}>
                        {imageNames.map((imageName, index) => (
                            <Grid item key={index}>
                                <GalleryImageCard 
                                    img={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageName}`} 
                                    layout={getPhotoStyle(imageName)} 
                                    isSelected={!!selectedImages[index]}
                                    onToggleSelect={() => handleToggleSelect(index)}
                                />
                            </Grid>
                        ))}
                    </Grid> */}
                    <Grid container spacing={3} my={10} ml={5}>
                        {imageDetails.map((imageDetail, index) => (
                            <Grid item key={index}>
                                <GalleryImageCard 
                                    img={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageDetail.name}`} 
                                    layout={getPhotoStyle(imageDetail.name)} 
                                    isSelected={!!selectedImages[index]}
                                    onToggleSelect={() => handleToggleSelect(index)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    
                </Box>
                <Box sx={{width: '10%'}}/>
            </Box>

            {/* modify gallery bottom */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button 
                    variant="contained"
                    sx={{margin: '0 50px 30px 0'}}
                >Valider et enregistrer ma galerie</Button>
            </Box>


            {
                Object.values(selectedImages).some(isSelected => isSelected) &&
                <IconButton onClick={deleteSelectedImages}>
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

            <ScrollUpButton />
            <ScrollDownButton />
        </Box>
    )
}