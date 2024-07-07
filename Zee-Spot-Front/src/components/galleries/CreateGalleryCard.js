import React from 'react'
import { Card, CardActionArea} from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';

export default function CreateGalleryCard(){
    return(
        <Card sx={{ width: '300px', height: '250px' }}>
            <CardActionArea 
                // onClick={cke tu veu rouya}
                component={Link}
                to={routes.GALLERY_FORM}
                sx={{
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}
            >
                <NoteAddIcon 
                    sx={{color: 'grey', fontSize: '100px'}}
                />
            </CardActionArea>
        </Card>
    )
}