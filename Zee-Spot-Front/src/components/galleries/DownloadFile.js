import { Box, Button, Input, Typography } from "@mui/material";
import React, { useState } from "react"
import FileUpload from "react-mui-fileuploader"

export default function DownloadFile(props){
    return(
        <Box
            p={5}
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography mb={3} variant="h2b">Téléchargez vos photos</Typography>
                <FileUpload
                    multiFile={true}
                    onFilesChange={props.handleFilesChange}
                    onContextReady={(context) => {}}
                    allowedExtensions={['png','apng', 'jpeg', 'jpg', 'pjpeg']}
                    acceptedType={'image/*'}
                />
            <Button onClick={props.handleClose}>Valider</Button>
        </Box>
    )
}