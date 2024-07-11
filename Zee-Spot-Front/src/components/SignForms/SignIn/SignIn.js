import React from "react";
import {TextField, Box, Checkbox, Button, Slide, Typography} from '@mui/material';
import LeftCurly from "../../../assets/img/LeftCurly.png";
import RightCurly from "../../../assets/img/RightCurly.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../provider/AuthProvider';
import authService from '../../../api/authService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function SignIn(props){
    const { setAccessToken, setRefreshToken, setUser } = useAuth();
    const navigate = useNavigate();

    const fetchProfile = (access_token) => {
        authService.profile(access_token, (statusCode, jsonRes) => {
            if (200 === statusCode) {
                setUser(JSON.stringify(jsonRes));
                setAccessToken(access_token);
                props.handleClose()
            } else if (401 === statusCode) {
                console.log('Identifiant ou mot de passe invalide');
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        
        authService.authenticate(data.get('email'), data.get('password'), (statusCode, jsonRes) => {
            if (200 === statusCode) {
                fetchProfile(jsonRes.token);
            } else if (401 === statusCode) {
                console.log('Identifiant ou mot de passe invalide');
            } else {
                console.log("Une erreur est survenue, veuillez réessayer ultérieurement.");
            };
        });
    };


    return(
        <Box 
            p={5} 
            sx={{
                display: 'flex', 
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url(${LeftCurly}), url(${RightCurly})`,
                    backgroundPosition: 'left bottom, right bottom',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundSize: '40%, 40%',
                    
                    width: "700px", 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    "& .MuiTextField-root": {
                        my: "10px"
                    }
                }}
            >
                <Box mb={7} sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    <Typography variant='letter'>C</Typography>
                    <Typography variant='h1'>ONNEXION</Typography>
                </Box>

                <form 
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <TextField required fullWidth id="outlined-basic" label="Email" variant="outlined" name="email" />
                    <TextField required fullWidth id="outlined-basic" label="Mot de passe" variant="outlined" name="password"/>
                    <Link><Typography mb={5} variant="h5">Mot de passe oublié</Typography></Link>

                    <Box sx={{display: 'flex', mt:'15px'}}>
                        <Button sx={{px: '30px', py: '10px', fontWeight: 'bold'}} variant="contained" type="submit">Connexion</Button>
                        <Checkbox />
                        <p>Rester connecté</p>
                    </Box>
                </form>

                <Button
                    onClick={props.handleClickOpenSignUp}
                    sx={{
                        mt: '25px',
                        color: 'secondary.main',
                        fontWeight: 'bold',
                        fontSize: '10px',
                        marginBottom: '50px'
                    }}
                >
                    Vous avez déjà un compte?
                    <br></br>
                    Inscrivez vous
                </Button>
            </Box>
        </Box>
    )
}