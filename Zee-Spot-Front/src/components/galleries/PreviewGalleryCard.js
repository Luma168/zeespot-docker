import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, Checkbox, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import routes from '../../routes/routes';
import imageService from '../../api/imageService';

export default function GalleryCard(props) {
    const [imageName, setImageName] = React.useState();
    const [openDialog, setOpenDialog] = React.useState(false);

    React.useEffect(() => {
        imageService.get_cover_by_gallery(props.gallery.id, localStorage.getItem('access_token'), (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setImageName(jsonRes.coverImage)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        })
    })

    const handleDelete = async () => {
        const access_token = localStorage.getItem('access_token');
        const images = props.gallery.images;
        
        // Delete images
        for (let imageUrl of images) {
            const imageId = imageUrl.split('/').pop(); // Extract the image ID from the URL
            await imageService.delete_image(access_token, imageId);
        }

        // Delete the gallery
        await props.onDelete(props.gallery.accessToken);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>

            <Card sx={{ maxWidth: 345, width: '300px', height: '250px', position: 'relative' }}>
                <Box sx={{height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'secondary.main'}}>
                    <Checkbox
                        sx={{ color: 'info.main' }}
                        checked={props.isSelected}
                        onChange={props.onToggleSelect} 
                    />
                    <IconButton 
                        sx={{ color: 'info.main'}}
                        onClick={handleOpenDialog}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Box>
                <CardActionArea component={Link} to={`${routes.GALLERY.replace(':uid', props.gallery.accessToken)}`} sx={{ height: '85%', position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageName}`}
                        // image={`http://localhost:8081/uploads/images/${imageName}`}
                        alt="gallery card"
                        sx={{
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '100%'
                        }}
                    />

                    <Box 
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            minHeight: '50px',
                            overflow: 'hidden',
                            padding: '8px',
                            background: 'rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h4b" sx={{ color: 'white' }}>
                            {props.gallery?.title}
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            {props.gallery.images.length} photos
                        </Typography>
                    </Box>
                </CardActionArea>
            </Card>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation de la suppression"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir supprimer cette gallerie?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        
    );
}