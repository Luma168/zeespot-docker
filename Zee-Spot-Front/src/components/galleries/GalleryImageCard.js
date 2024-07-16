import * as React from 'react';
import { CardMedia, Card, Checkbox, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

    export default function GalleryImageCard(props) {
        const [isSelected, setIsSelected] = React.useState(false)
        const [openDialog, setOpenDialog] = React.useState(false); // Dialog state
        
        const handleToggle = () => {
            setIsSelected((prevState) => !prevState);
        };

        const handleOpenDialog = () => {
            setOpenDialog(true);
        };
    
        const handleCloseDialog = () => {
            setOpenDialog(false);
        };
    
        const handleDelete = () => {
            props.onDelete();
            handleCloseDialog();
        };

    return (
        <>
            <Card 
                elevation={5}
                sx={{ 
                    maxWidth: 345,
                    width: props.layout.width, 
                    height: props.layout.height, 
                    position: 'relative', 
                    '&:hover .selectBar' : {display: 'flex'},
                }}
                >
                {/* top bar */} 
                <Box 
                    className='selectBar'
                    sx={{
                        position: 'relative', 
                        width: '100%',
                        height: '15%',
                        display: isSelected ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: 'secondary.main',
                    }}
                    >
                    <Checkbox 
                        checked={props.isSelected}
                        onChange={props.onToggleSelect}
                        onClick={handleToggle} 
                        sx={{color: 'info.main'}} />
                    <IconButton 
                        sx={{ color: 'info.main'}}
                        onClick={handleOpenDialog}
                        >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Box>
                {/* Image */}
                <Box sx={{ height: '100%', position: 'relative' }} onClick={() => props.onOpen(props.index)}>
                    <CardMedia
                        component="img"
                        image={props.img}
                        alt="gallery card"
                        sx={{
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '100%'
                        }}
                    />
            </Box>
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
                        Êtes-vous sûr de vouloir supprimer cette image?
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