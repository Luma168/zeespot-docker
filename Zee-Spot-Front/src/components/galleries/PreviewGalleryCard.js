import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, Checkbox, Box, CardContent, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import Mino from '../../assets/img/mino.jpg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import routes from '../../routes/routes';

export default function GalleryCard(props) {
  return (
    <Card sx={{ maxWidth: 345, width: '300px', height: '250px', position: 'relative' }}>
        <Box sx={{height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'secondary.main'}}>
            <Checkbox sx={{ color: 'info.main'}} />
            <IconButton sx={{ color: 'info.main'}}>
                <DeleteOutlineIcon />
            </IconButton>
        </Box>
        <CardActionArea component={Link} to={routes.GALLERY} sx={{ height: '85%', position: 'relative' }}>
            <CardMedia
                component="img"
                image={Mino}
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
                    Titre
                </Typography>
                <Typography variant="h5" sx={{ color: 'white' }}>
                    350 photos
                </Typography>
            </Box>
        </CardActionArea>
    </Card>
  );
}