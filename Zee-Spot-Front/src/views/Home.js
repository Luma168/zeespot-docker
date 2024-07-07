import React, { useEffect, useState } from "react";
import {Box, GlobalStyles, Typography} from '@mui/material';
import Logo from '../assets/img/logo_zeespot.png'
import PreviewImage from '../assets/img/preview-cutom-gallery.png'
import GalleryLayout from '../assets/img/GalleryLayout.png'
import CommentsPellicule from '../assets/img/commentsPellicule.png'
import RandomImg1 from '../assets/img/home-random1.png'
import RandomImg2 from '../assets/img/home-random2.png'
import RandomImg3 from '../assets/img/home-random3.png'
import RandomImg4 from '../assets/img/home-random4.png'
import {ScrollDownButton, ScrollUpButton} from "../components/common/ScrollButtons";


export default function Home(){
    return(
        <Box sx={{bgcolor: 'info.main'}}>
            <Box 
                sx={{
                    display: 'flex', 
                    flexDirection:'column',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // height: `calc(100vh - 200px)`
                }}  
            >
                {/* Catch phrase */}
                <Box
                    mb={3}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between', 
                    }}
                >
                    <Box sx={{alignSelf: 'flex-end'}}>
                        <img src={RandomImg4}/>
                    </Box>
                    <Box
                        mt={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <img src={Logo} width={'300px'}/>
                        <Typography 
                            my={7}
                            align="center"
                            variant="h1"
                        >
                            Chaque moment à sa photo.
                            <br></br>
                            Chaque histoire a sa galerie.
                            <br></br>
                            Commencez votre histoire dès maintenant !
                        </Typography>
                    </Box>
                    <Box>
                        <img src={RandomImg3} width={'250px'}/>
                    </Box>
                </Box>

                {/* Custom preview */}
                {/* <Box>
                    <img width='100%' src={CustomGallery} />
                </Box> */}

                <Box
                    sx={{
                        bgcolor: 'secondary.main',
                        borderTop: 4,
                        borderColor: 'primary.main',
                        height: '700px',
                        display: 'flex'
                    }}
                >
                    <Box sx={{width: '50%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img 
                            src={PreviewImage}
                            width='80%'
                        />
                    </Box>
                    <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography 
                            sx={{color: 'info.main'}} 
                            align="center"
                            variant="h1b"
                            mb={10}
                        >
                            Personnalisez votre galerie
                        </Typography>
                        <Typography 
                            sx={{color: 'info.main'}} 
                            align="center"
                            variant="h3"
                            mb={7}
                        >
                            vous aurez la possibiliter de
                            <br></br>
                            conserver votre identité
                            <br></br>
                            graphique grâce aux différents
                            <br></br>
                            thèmes mis à votre disposition.
                        </Typography>
                        <Typography 
                            sx={{color: 'info.main'}} 
                            align="center"
                            variant="h3"
                        >
                            Si aucun ne vous convient,
                            <br></br>
                            pas d'inquiétude.
                            <br></br>
                            Envoyez-nous vos couleurs, et nous
                            <br></br>
                            nous occupons du reste !
                        </Typography>
                    </Box>
                </Box>

                {/* Gallery layout txt */}
                <Box
                    
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between', 
                    }}
                >
                    <Box sx={{alignSelf: 'flex-start'}}>
                        <img width={'250px'} src={RandomImg1}/>
                    </Box>
                    <Box my={10} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography 
                            align="center" 
                            variant="h1b"
                            my={5}
                        >Choisissez la disposition de vos photos
                        </Typography>
                        <Typography 
                            align="center"
                            variant="h3"
                        >
                            On ne le répètera jamais assez :
                            <br></br>
                            Chaque histoire à sa galerie... ou plutôt pourrait-on dire, chaque shooting !
                        </Typography>
                    </Box> 
                    <Box sx={{alignSelf: 'flex-end'}}>
                        <img src={RandomImg2}/>
                    </Box>  
                </Box>

                {/* Gallery preview */}
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <img width='100%' src={GalleryLayout} />
                </Box>

                {/* Comments */}
                <Box mt={20}>
                    <img width='100%' src={CommentsPellicule} />
                </Box>
                
                <Box>
                    <ScrollUpButton />
                    <ScrollDownButton />
                </Box>

            </Box>
        </Box>
    )
}