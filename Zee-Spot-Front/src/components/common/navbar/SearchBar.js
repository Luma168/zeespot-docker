import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import photographerService from '../../../api/photographerService';

export default function SearchBar() {
    const [photographers, setPhotographers] = useState([]);

    useEffect(() => {
        photographerService.get_all_photographers((statusCode, jsonRes) => {
          if (statusCode === 200) {
            setPhotographers(jsonRes);
          } else {
            console.log("Failed to fetch photographers");
          }
        });
      }, []);

    return (
        <Stack spacing={2} sx={{ minWidth: 400, ml: '100px' }}>
            <Autocomplete
                freeSolo
                options={photographers}
                getOptionLabel={(option) => `${option.nom} ${option.prenom} (${option.ville}, ${option.departement}, ${option.code_postal})`}
                renderInput={(params) => 
                  <TextField 
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.dark', // Default border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.light', // Border color when hovered
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.light', // Border color when focused
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'primary.dark', // Default label color
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'primary.light', // Label color when focused
                      },
                      '& input': {
                        color: 'primary.dark', // Default text color
                      },
                      '& .MuiIconButton-root': {
                        color: 'primary.dark', // Color of the clear button (x)
                      },
                      '& .MuiIconButton-root:hover': {
                        color: 'primary.light', // Color of the clear button (x) when hovered
                      },
                    }} 
                    {...params} 
                    label="Rechercher un photographe" 
                  />
                }
                filterOptions={(options, { inputValue }) => {
                return options.filter((option) => {
                    const combinedString = `${option.nom} ${option.prenom} ${option.ville} ${option.departement} ${option.code_postal}`.toLowerCase();
                    return combinedString.includes(inputValue.toLowerCase());
                });
                }}
            />
        </Stack>
    );
}

