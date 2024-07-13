import React, { useEffect, useState } from "react";
import {Box, Typography, IconButton, Grid, Button, Modal} from '@mui/material';
import CameraLogo from '../../assets/img/camera-logo.png'
import {ScrollUpButton, ScrollDownButton} from "../../components/common/ScrollButtons";
import { useParams } from 'react-router-dom';
import galleryService from "../../api/galleryService";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import imageService from "../../api/imageService";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useNavigate } from 'react-router-dom';
import routes from "../../routes/routes";
import GalleryImageCard from '../../components/galleries/GalleryImageCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';


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
          default:
            return { width: '300px', height: '300px' };  // square
        }
    };

    const [selectedImages, setSelectedImages] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(-1);

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

    const handleDeleteImage = async (index) => {
        const access_token = localStorage.getItem('access_token');
        const imageDetail = imageDetails[index];
        if (imageDetail) {
            await imageService.delete_image(access_token, imageDetail.id);

            const updatedGalleryImages = gallery.images.filter((_, i) => i !== index);
            setGallery(prevGallery => ({
                ...prevGallery,
                images: updatedGalleryImages
            }));

            const updatedImageDetails = imageDetails.filter((_, i) => i !== index);
            setImageDetails(updatedImageDetails);
            setSelectedImages(prevSelected => {
                const newSelected = { ...prevSelected };
                delete newSelected[index];
                return newSelected;
            });
        }
    };

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

    const handleNavigate = (index) => {
        if (index >= 0 && index < imageDetails.length) {
            setCurrentImageIndex(index);
        }
    };

    const handleCloseModal = () => {
        setCurrentImageIndex(-1);
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
                                    // img={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageDetail.name}`} 
                                    img={`http://localhost:8081/uploads/images/${imageDetail.name}`} 
                                    layout={getPhotoStyle(imageDetail.name)} 
                                    isSelected={!!selectedImages[index]}
                                    onToggleSelect={() => handleToggleSelect(index)}
                                    onDelete={() => handleDeleteImage(index)}
                                    index={index}
                                    onOpen={handleNavigate}
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

            {/* Modal for displaying the image in a larger view */}
            {currentImageIndex >= 0 && currentImageIndex < imageDetails.length && (
                <Modal
                    open={currentImageIndex >= 0}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            bgcolor: 'rgba(0, 0, 0, 0.8)',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                        onClick={handleCloseModal}
                    >
                        <IconButton 
                            sx={{ 
                                position: 'absolute', 
                                top: 16, 
                                right: 16, 
                                color: 'white',
                                zIndex: 1
                            }}
                            onClick={handleCloseModal}
                        >
                            <CloseIcon />
                        </IconButton>
                        {currentImageIndex > 0 && (
                            <IconButton 
                                sx={{ 
                                    position: 'absolute', 
                                    left: 16, 
                                    color: 'white',
                                    zIndex: 1
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate(currentImageIndex - 1);
                                }}
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        )}
                        {currentImageIndex < imageDetails.length - 1 && (
                            <IconButton 
                                sx={{ 
                                    position: 'absolute', 
                                    right: 16, 
                                    color: 'white',
                                    zIndex: 1
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate(currentImageIndex + 1);
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        )}
                        <img 
                            src={`http://localhost:8081/uploads/images/${imageDetails[currentImageIndex].name}`} 
                            alt="gallery full view" 
                            style={{
                                maxHeight: '90%',
                                maxWidth: '90%',
                                cursor: 'default'
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent click on image from closing modal
                        />
                    </Box>
                </Modal>
            )}

            <ScrollUpButton />
            <ScrollDownButton />
        </Box>
    )
}