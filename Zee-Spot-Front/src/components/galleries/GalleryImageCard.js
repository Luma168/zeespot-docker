import * as React from 'react';
import { CardMedia, Card, Checkbox, Box, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

    export default function GalleryImageCard(props) {
        const [isSelected, setIsSelected] = React.useState(false)

        const handleToggle = () => {
            setIsSelected((prevState) => !prevState);
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
                        onClick={props.onDelete}
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
    </>
  );
}