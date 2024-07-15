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
        <Stack spacing={2} sx={{ minWidth: 300 }}>
            <Autocomplete
                freeSolo
                options={photographers}
                getOptionLabel={(option) => `${option.nom} ${option.prenom} (${option.ville}, ${option.departement}, ${option.code_postal})`}
                renderInput={(params) => <TextField {...params} label="Trouver un photographe" />}
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

