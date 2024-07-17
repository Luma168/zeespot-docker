import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Grid, Modal, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CameraLogo from '../../assets/img/camera-logo.png';
import { ScrollUpButton, ScrollDownButton } from "../../components/common/ScrollButtons";
import { useParams } from 'react-router-dom';
import galleryService from "../../api/galleryService";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import imageService from "../../api/imageService";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useNavigate } from 'react-router-dom';
import routes from "../../routes/routes";
import GalleryImageCard from '../../components/galleries/GalleryImageCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import EditGalleryDialog from '../../components/galleries/EditGalleryDialog'; 

dayjs.locale('fr');

export default function Gallery() {
    
    const [selectedImages, setSelectedImages] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(-1);
    const [loading, setLoading] = useState(true); // Loading state
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openGalleryConfirmDialog, setOpenGalleryConfirmDialog] = useState(false); // New state for gallery deletion
    const navigate = useNavigate();
    const { uid } = useParams();    
    const [gallery, setGallery] = useState();
    const [imageDetails, setImageDetails] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const layout = gallery ? gallery.disposition : 'paysage';

    const getPhotoStyle = (photo) => {
        switch (layout) {
            case 'basique':
                return { width: '300px', height: '300px' };
            case 'paysage':
                return { width: '400px', height: '225px' };
            case 'portrait':
                return { width: '225px', height: '400px' };
            default:
                return { width: '300px', height: '300px' };
        }
    };
    
    const handleToggleSelect = (id) => {
        setSelectedImages((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    useEffect(() => {
        galleryService.get_gallery_by_uid(localStorage.getItem('access_token'), uid, (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGallery(jsonRes);
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            }
        });
    }, [uid]);

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
                setLoading(false); // Set loading to false when images are loaded
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
            imageService.delete_image(access_token, image.substring(12));
        });

        galleryService.delete_gallery_by_uid(access_token, uid);
        navigate(routes.HOME);
    }

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmDelete = async () => {
        await deleteSelectedImages();
        handleCloseConfirmDialog();
    };

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

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEdit = (updatedGallery) => {
        const { titre, date, disposition, public: isPublic } = updatedGallery;
        galleryService.patch_gallery_by_uid(titre, date, disposition, isPublic, localStorage.getItem('access_token'), uid, (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGallery({
                    ...gallery,
                    titre,
                    date,
                    disposition,
                    public: isPublic,
                });
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            }
            handleCloseEditDialog();
        });
    };

    const handleOpenGalleryConfirmDialog = () => {
        setOpenGalleryConfirmDialog(true);
    };

    const handleCloseGalleryConfirmDialog = () => {
        setOpenGalleryConfirmDialog(false);
    };

    const handleConfirmDeleteGallery = async () => {
        await deleteGallery(uid);
        handleCloseGalleryConfirmDialog();
    };

    const renderLoaders = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <Grid item key={index}>
                <Box
                    sx={{
                        width: getPhotoStyle().width, 
                        height: getPhotoStyle().height,
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

    return (
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
                    </Box>
                    <IconButton 
                        onClick={handleOpenEditDialog}
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
                                fontSize: '60px', 
                                borderRadius: '15px',
                            }} 
                        />
                    </IconButton>

                    <IconButton 
                        onClick={handleOpenGalleryConfirmDialog}
                        sx={{ 
                            color: 'info.main', 
                            '&:hover': {
                                bgcolor: 'primary.light'
                            }
                        }} 
                    >
                        <DeleteOutlineIcon 
                            sx={{   
                                fontSize: '60px',
                                color: 'black'
                            }}
                        />
                    </IconButton>

                </Box>
            </Box>
            
            <Box sx={{ display: 'flex' }}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    {loading ? (
                        <Grid container spacing={3} my={10} ml={5}>
                            {renderLoaders(8)} {/* Display 8 loaders as placeholders */}
                        </Grid>
                    ) : (
                        <Grid container spacing={3} my={10} ml={5}>
                            {imageDetails.map((imageDetail, index) => (
                                <Grid item key={index}>
                                    <GalleryImageCard 
                                        img={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageDetail.name}`}
                                        // img={`http://localhost:8081/uploads/images/${imageDetail.name}`} 
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
                    )}
                </Box>
                <Box sx={{ width: '10%' }}/>
            </Box>

            {Object.values(selectedImages).some(isSelected => isSelected) &&
                <IconButton onClick={handleOpenConfirmDialog}>
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
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">{"Confirmation de la suppression"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Êtes-vous sûr de vouloir supprimer ces images ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openGalleryConfirmDialog}
                onClose={handleCloseGalleryConfirmDialog}
                aria-labelledby="gallery-confirm-dialog-title"
                aria-describedby="gallery-confirm-dialog-description"
            >
                <DialogTitle id="gallery-confirm-dialog-title">{"Confirmation de la suppression de la galerie"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="gallery-confirm-dialog-description">
                        Êtes-vous sûr de vouloir supprimer cette galerie ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGalleryConfirmDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDeleteGallery} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

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
                            src={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageDetails[currentImageIndex].name}`}
                            // src={`http://localhost:8081/uploads/images/${imageDetails[currentImageIndex].name}`} 
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

            <EditGalleryDialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                gallery={gallery}
                onSave={handleSaveEdit}
            />
        </Box>
    );
}
