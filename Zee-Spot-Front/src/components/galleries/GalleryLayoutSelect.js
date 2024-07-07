import * as React from 'react';
import { Typography, Box, InputLabel, MenuItem, FormControl, Select, Divider } from '@mui/material';

import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'; // Vrac
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Portrait
import ViewDayIcon from '@mui/icons-material/ViewDay'; // Paysage
import AppsIcon from '@mui/icons-material/Apps';

export default function GalleryLayoutSelect() {
  const [galleryLayout, setGalleryLayout] = React.useState('');

  const handleChange = (event) => {
    setGalleryLayout(event.target.value);
  };


  return (
    <Box sx={{display: 'flex', justifyContent: 'center' }}>
        <FormControl 
            sx={{
                width: '400px',
                // '& .MuiMenu-paper':{
                //     width: '300px'
                // }
            }}
        >
            <InputLabel id="demo-simple-select-label">Disposition souhaitée</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={galleryLayout}
                label="Disposition souhaitée"
                onChange={handleChange}
                name='disposition'
            >          
                <MenuItem value={'basique'}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <AppsIcon />
                        <Typography ml={2}>Basique</Typography>
                    </Box>
                </MenuItem>
                <Divider variant='middle' />
                <MenuItem value={'paysage'}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <ViewDayIcon />
                        <Typography ml={2}>Paysage</Typography>
                    </Box>
                </MenuItem>
                <Divider variant='middle' />
                <MenuItem value={'Portrait'}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <ViewModuleIcon />
                        <Typography ml={2}>Portrait</Typography>
                    </Box>
                </MenuItem>
                <Divider variant='middle' />
                <MenuItem value={'Vrac'}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <ViewQuiltIcon />
                        <Typography ml={2}>Vrac</Typography>
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    </Box>
  );
}