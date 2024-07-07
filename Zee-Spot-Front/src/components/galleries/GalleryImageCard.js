import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, Checkbox, Box, CardContent, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import routes from '../../routes/routes';

export default function GalleryImageCard(props) {
  return (
    <Card 
        elevation={5}
        sx={{ 
            maxWidth: 345, 
            width: props.layout.width, 
            height: props.layout.height, 
            position: 'relative',
            '&:hover .selectBar' : {display: 'flex'} 
        }}
    >
        {/* top bar */}
        <Box 
            className='selectBar'
            sx={{
                position: 'relative',
                // top: 0,  
                width: '100%',
                height: '15p%',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'secondary.main',
            }}
        >
            <Checkbox sx={{ color: 'info.main'}} />
            <IconButton sx={{ color: 'info.main'}}>
                <DeleteOutlineIcon />
            </IconButton>
        </Box>
        {/* Image */}
        <Box component={Link} to={routes.GALLERY} sx={{ height: '100%', position: 'relative' }}>
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
  );
}