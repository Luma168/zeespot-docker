import React, { useEffect, useState } from "react";
import {Box, Typography, IconButton, Grid, Button} from '@mui/material';
import CameraLogo from '../../assets/img/camera-logo.png'
import {ScrollUpButton, ScrollDownButton} from "../../components/common/ScrollButtons";
import { useParams } from 'react-router-dom';
import galleryService from "../../api/galleryService";
import { useAuth } from '../../provider/AuthProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import imageService from "../../api/imageService";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useNavigate } from 'react-router-dom';
import routes from "../../routes/routes";
import GalleryImageCard from '../../components/galleries/GalleryImageCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Gallery(){
    // const photos = [
    //     "https://blog.artsper.com/wp-content/uploads/2022/06/pepefroggie-770x432-2-644x362.jpg",
    //     "https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg",
    //     "https://img.lemde.fr/2016/08/04/0/0/560/267/664/0/75/0/a9b1471_17806-xsb5q2.jpg",
    //     "https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-mediumSquareAt3X-v5.jpg",
    //     "https://www.digitaltrends.com/wp-content/uploads/2019/03/whatisameme04.jpg?fit=720%2C720&p=1",
    //     "https://powertofly.com/up/media-library/distracted-boyfriend-sexist-boss-meme-your-idea-repeated-by-a-guy-your-boss-you-when-you-said-your-idea.jpg?id=20568445&width=744&quality=90",
    //     "https://manga-universe.net/wp-content/uploads/2023/07/Almost-every-shocked-face-1024x768.jpg",
    //     "https://i.kym-cdn.com/entries/icons/facebook/000/038/233/707.jpg",
    //     "https://www.mememaker.net/static/images/memes/4849801.jpg",
    //     "https://blog.media.io/images/images2022/funny-text-memes-1.jpg",
    //     "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/duw9vgampaecvtjfytjo.png",
    //     "https://uploads.dailydot.com/2023/11/bonk-meme.jpg?q=65&auto=format&w=1600&ar=2:1&fit=crop",
    //     "https://pyxis.nymag.com/v1/imgs/09c/923/65324bb3906b6865f904a72f8f8a908541-16-spongebob-explainer.rsquare.w400.jpg",
    //     "https://c0.lestechnophiles.com/www.madmoizelle.com/wp-content/uploads/2017/02/meme-fevrier-2017.jpg?resize=640,361&key=135c26c7",
    // ]

    // const layout = 'square';
    // const layout = 'portrait';
    const layout = 'paysage';
    // const layout = 'vrac';

    const getPhotoStyle = (photo) => {
        switch (layout) {
          case 'square':
            return { width: '300px', height: '300px' };
          case 'paysage':
            return { width: '400px', height: '225px' };
          case 'portrait':
            return { width: '225px', height: '400px' };
        //   case 'vrac':
        //     const aspectRatio = height / width //???; TROUVER COMMENT AVOIR LE RATIO 
        //     if (aspectRatio > 1.5) return { width: '400px', height: '250px' }; // paysage
        //     if (aspectRatio < 0.75) return { width: '250px', height: '400px' }; // portrait
        //     // return { width: '300px', height: '300px' }; // square
        //   default:
        //     return { width: '300px', height: '300px' };  // square
        }
    };

    // Check checkbox to display bin
    const [selectedImages, setSelectedImages] = useState({});
    const handleToggleSelect = (id) => {
        setSelectedImages((prevSelected) => ({
        ...prevSelected,
        [id]: !prevSelected[id],
        }));
    };
    const areSelected = Object.values(selectedImages).some((isSelected) => isSelected);


    const { setAccessToken, setRefreshToken, setUser } = useAuth();
    const navigate = useNavigate();
    const { uid } = useParams();    
    const [gallery, setGallery] = useState();
    const [imageNames, setImageNames] = useState([])

    useEffect(() => {
        galleryService.get_gallery_by_uid(localStorage.getItem('access_token'), uid, (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setGallery(jsonRes)
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }, [uid])

    useEffect(() => {
        if (gallery) {
            const fetchImageNames = async () => {
                const imageNamePromises = gallery.images.map((url) =>
                    new Promise((resolve) => {
                        imageService.get_image_name(localStorage.getItem("access_token"), url.substring(4), (statusCode, jsonRes) => {
                            if (200 === statusCode) {
                                resolve(jsonRes.name);
                            } else {
                                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
                                resolve(null);
                            }
                        });
                    })
                );

                const imageNamesArray = await Promise.all(imageNamePromises);
                const uniqueImageNames = [...new Set(imageNamesArray.filter(name => name !== null))];
                setImageNames(uniqueImageNames);
            };

            fetchImageNames();
        }
    }, [gallery]);

    function deleteGallery(uid) {
        const access_token = localStorage.getItem('access_token');
        gallery?.images.forEach((image) => {
            imageService.delete_image(access_token, image.substring(12))
        })
        
        galleryService.delete_gallery_by_uid(access_token, uid);

        navigate(routes.HOME)
    }

    return(
        <Box bgcolor="info.main">

            {/* Gallery info */}
            <Box 
                sx={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                }}
            >
                <Box 
                    component='img' 
                    src={CameraLogo} //faire adapter
                    alt="logo du photographe"
                    width={200}
                    mt={5}
                    ml={5}
                />

                {/* Gallery info (title, date)  */}
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        textAlign: 'center',
                        bgcolor: 'primary.main',
                        width: '50%',
                        height: '150px',
                        boxShadow: 3
                    }}
                >
                    <Box>
                        <Typography variant="h3b">{gallery ? gallery.titre : ""}</Typography>
                        <Typography variant="h3">{gallery ? dayjs(gallery.date).format('D MMMM, YYYY') : ""}</Typography>
                        {/* <Typography variant="h3b">Mariage : Mon mariage</Typography>
                        <Typography variant="h3">05/05/2024</Typography> */}
                    </Box>
                    <IconButton 
                        onClick={() => deleteGallery(uid)}
                        sx={{ 
                            color: 'info.main', 
                            '&:hover': {
                                bgcolor: 'primary.light'
                            }
                        }} 
                    >
                        <DriveFileRenameOutlineRoundedIcon 
                            sx={{
                                color: 'black', 
                                // bgcolor: 'primary.light', 
                                fontSize: '60px', 
                                borderRadius: '15px',
                                
                            }} 
                        />
                    </IconButton>
                </Box>
            </Box>

            {/* Pictures display */}
            {/* <Box sx={{display: 'flex'}}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    <Grid container spacing={3} my={10} ml={5}>
                        {photos.map((photo) => (
                            <Grid item>
                                <GalleryImageCard img={photo} layout={getPhotoStyle(photo)} areSelected={areSelected}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box 
                    sx={{width: '10%'}}/>
            </Box> */}
            
            <Box sx={{display: 'flex'}}>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    <Grid container spacing={3} my={10} ml={5}>
                        {imageNames.map((imageName, index) => (
                            <Grid item key={index}>
                                <GalleryImageCard 
                                    img={`${window.location.origin.replace(/0$/, '1')}/uploads/images/${imageName}`} 
                                    layout={getPhotoStyle(imageName)} 
                                    isSelected={!!selectedImages[index]}
                                    onToggleSelect={() => handleToggleSelect(index)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    
                </Box>
                <Box sx={{width: '10%'}}/>
            </Box>

            {/* modify gallery bottom */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button 
                    variant="contained"
                    sx={{margin: '0 50px 30px 0'}}
                >Valider et enregistrer ma galerie</Button>
            </Box>


            {
                areSelected 
                && 
                (<IconButton>
                    <DeleteOutlineIcon 
                        sx={{   
                            fontSize: '40px',
                            position: 'fixed',
                            top: '58%',
                            right: 39,
                            color: 'black'
                        }}
                    />
                </IconButton>)
            }

            <ScrollUpButton />
            <ScrollDownButton />
        </Box>
    )
}