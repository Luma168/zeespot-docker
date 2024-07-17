import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, Dialog, Slide, TextField, Typography } from '@mui/material'
import GalleryLayoutSelect from '../../components/galleries/GalleryLayoutSelect'
import DownloadFile from '../../components/galleries/DownloadFile';
import galleryService from '../../api/galleryService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import imageService from '../../api/imageService';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function GalleryForm() {
    const [disposition, setDisposition] = useState('');
    const [openDownloadFile, setOpenDownloadFile] = useState(false);
    const navigate = useNavigate();
    const [filesToUpload, setFilesToUpload] = useState([])
    const [coverFile, setCoverFile] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleFilesChange = (files) => {
        setFilesToUpload([ ...files ])
    };

    const handleCoverChange = (event) => {
        setCoverFile(event.target.files[0]);
    };

    function handleOpenDownloadFile() {
        setOpenDownloadFile(true)
    }

    function handleClose() {
        setOpenDownloadFile(false);
    }

    async function uploadFiles(galerieId) {
        const uploadPromises = filesToUpload.map((file) => {
            return imageService.create_image(
                0,
                0,
                galerieId,
                file,
                localStorage.getItem('access_token')
            )
        });
        await Promise.all(uploadPromises);
    }

    const uploadCover = async (galerieId) => {
        if (coverFile) {
            await imageService.create_image(
                0,
                1,
                galerieId,
                coverFile,
                localStorage.getItem('access_token')
            );
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;
        galleryService.create_gallery(
            localStorage.getItem('user'), 
            data.get('titre'), 
            formattedDate, 
            disposition, 
            data.get('public'),
            localStorage.getItem('access_token'),
            async (statusCode, jsonRes) => {
                if (201 === statusCode) {
                    await uploadFiles(jsonRes.id);
                    await uploadCover(jsonRes.id);
                    navigate(`/galerie/${jsonRes.accessToken}`);
                } else {
                    console.log("Une erreur est survenue, veuillez réessayer ultérieure.");
                };
            }
        );
    }

    return (
        <Box sx={{ bgcolor: 'info.main' }}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    height: `calc(100vh - 204px)`
                }}
            >
                {/* Title */}
                <Box sx={{ justifySelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                        px={7}
                        py={2}
                        sx={{
                            bgcolor: 'primary.light',
                            boxShadow: 5
                        }}
                    >
                        <Typography variant='letter'>N</Typography>
                        <Typography variant='h1b'>OUVELLE </Typography>
                        <Typography variant='letter'>G</Typography>
                        <Typography variant='h1b'>ALERIE</Typography>
                    </Box>
                    <Box sx={{
                        width: '300px',
                        height: '30px',
                        bgcolor: 'secondary.main',
                        boxShadow: 3
                    }} />
                </Box>

                {/* Form */}
                <form onSubmit={submit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '30px'
                        }}
                    >
                        <Box
                            gap={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <TextField sx={{ width: '400px' }} required fullWidth id="outlined-basic" label="Nom de la Galerie" variant="outlined" name="titre" />
                            <GalleryLayoutSelect disposition={disposition} setDisposition={setDisposition} />
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                                <DatePicker label="Date" required name="date" />
                            </LocalizationProvider>
                        </Box>

                        {/* Public checkbox */}
                        <Box my={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox inputProps={{ 'name': 'public' }} />
                            <Typography variant='h4'>Galerie Publique</Typography>
                        </Box>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            photo de couverture
                            <VisuallyHiddenInput type="file" name='couverture' onChange={handleCoverChange} />
                        </Button>

                        <Dialog
                            open={openDownloadFile}
                            onClose={handleClose}
                            TransitionComponent={Transition}
                            keepMounted
                            aria-describedby="alert-dialog-slide-description"
                            maxWidth={true}
                        >
                            <DownloadFile
                                handleClose={handleClose}
                                filesToUpload={filesToUpload}
                                handleFilesChange={handleFilesChange}
                            />
                        </Dialog>

                        <Box
                            sx={{
                                marginTop: '30px',
                                '& .MuiButtonBase-root': {
                                    padding: '15px 20px',
                                    bgcolor: 'primary.light',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <Button onClick={handleOpenDownloadFile} variant='contained' sx={{ marginRight: '40px' }}>Télécharger mes photos</Button>
                            <Button variant='contained' type="submit">Création de ma galerie</Button>
                        </Box>

                    </Box>

                </form>
            </Container>
        </Box>
    )
}
