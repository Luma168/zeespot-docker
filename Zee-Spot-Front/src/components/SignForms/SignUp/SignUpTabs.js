import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {AppBar, Tabs, Tab, Typography, Box, Button, TextField, Slide} from '@mui/material';
import userService from '../../../api/userService';
import { useNavigate } from "react-router-dom";
import LeftCurly from '../../../assets/img/LeftCurly.png'
import RightCurly from '../../../assets/img/RightCurly.png'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {  
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const submit = (e) => {
        const data = new FormData(e.currentTarget);
        e.preventDefault();

        if (data.get('password') !== data.get('confirm-password')) {
            console.log({ password: "Les mot de passes sont incorrectes", confirm_password: "Les mot de passes sont incorrectes" });
        }

        userService.create_user(
            data.get('nom'), 
            data.get('prenom'), 
            data.get('email'),
            data.get('email_pro'), 
            data.get('tel_primaire'), 
            data.get('tel_secondaire'),
            data.get('siret'),
            data.get('siege_social'),
            data.get('password'),
            data.get('role'),
            (statusCode, jsonRes) => {
                if (200 === statusCode) {
                    console.log("Compte crée avec succès.");
                    props.handleClickOpenSignIn()
                } else {
                    console.log("Une erreur est survenue, veuillez réessayer ultérieure.");
                };
            }
        );
    }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}} >
        <Box p={5} sx={{ bgcolor: 'background.paper', borderRadius:'15px'}}>

            <Box sx={{display:'flex', justifyContent:'center'}}>
                <AppBar 
                    position="static"
                    sx={{
                        bgcolor:'primary.light', 
                        borderRadius:'25px',
                        width:'400px',
                        border: 2, 
                        borderColor:'black'
                    }}
                >
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="fullWidth"
                    centered
                    aria-label="full width tabs example"
                    sx={{
                        "& .MuiTabs-indicator":{
                            color:'black',
                            fontWeight:'bold',  
                            height:'100%',
                            borderRadius:'25px',
                            opacity:'30%',
                            bgcolor:'primary.dark',
                        }
                    }}
                    >
                        <Tab 
                            label="Client" 
                            {...a11yProps(0)} 
                            sx={{
                                color:'black',
                                fontWeight:'bold',  
                                ".MuiTouchRipple-root":{
                                    color:'primary.light', //couleur pour le onClick
                                }
                            }}
                        />
                        <Tab 
                            label="Pro" 
                            {...a11yProps(1)} 
                            sx={{
                                color:'black',
                                fontWeight:'bold',  
                                ".MuiTouchRipple-root":{
                                    color:'primary.light', //couleur pour le onClick
                                },
                            }}
                        />
                    </Tabs>
                </AppBar>
            </Box>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {/* CLIENT */}
                
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box 
                        sx={{
                            display: 'flex', 
                            flexDirection:'column',

                            backgroundImage: `url(${LeftCurly}), url(${RightCurly})`,
                            backgroundPosition: 'left bottom, right bottom',
                            backgroundRepeat: 'no-repeat, no-repeat',
                            backgroundSize: '40%, 40%',
                        }} 
                    >
                        <form 
                            onSubmit={submit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box 
                                fullWidth
                                sx={{
                                    "& .MuiTextField-root": {
                                        my: "10px"
                                    }
                                }}
                            >
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <TextField required sx={{width: "49%"}} id="outlined-basic" label="Nom" variant="outlined" name='nom' />
                                    <TextField required sx={{width: "49%"}} id="outlined-basic" label="Prénom" variant="outlined" name='prenom' />
                                </Box>
                                <TextField required fullWidth id="outlined-basic" label="Email" variant="outlined" name='email'/>
                                <TextField required fullWidth id="outlined-basic" label="Mot de passe" variant="outlined" name='password'/>
                                <TextField required fullWidth id="outlined-basic" label="Confirmer mot de passe" variant="outlined" name='confirm-password'/>
                                <input type="hidden" name="role" value="ROLE_CLIENT" />
                            </Box>
                            <Button size='large' sx={{alignSelf:'center', mt:'25px'}} variant="contained" type='submit'>VALIDER L'INSCRIPTION</Button>
                        </form>
                        
                        <Button 
                            onClick={props.handleClickOpenSignIn}
                            sx={{
                                mt: '25px',
                                color: 'secondary.main',
                                fontWeight: 'bold',
                                fontSize: '10px',
                                width: 'fit-content',
                                alignSelf: 'center',
                                marginBottom: '100px'
                            }}
                        >
                            Vous avez déjà un compte?
                            <br></br>
                            Connectez vous
                        </Button>
                    </Box>
                </TabPanel>

                {/* PRO */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box 
                        sx={{
                            display: 'flex', 
                            flexDirection:'column',

                            backgroundImage: `url(${LeftCurly}), url(${RightCurly})`,
                            backgroundPosition: 'left bottom, right bottom',
                            backgroundRepeat: 'no-repeat, no-repeat',
                            backgroundSize: '30%, 30%',
                        }}
                    >

                        <form 
                            onSubmit={submit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box 
                                fullWidth
                                sx={{
                                    "& .MuiTextField-root": {
                                        my: "10px"
                                    }
                                }}
                            >
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <TextField required sx={{width: "49%"}} id="outlined-basic" label="Nom" variant="outlined" name='nom' />
                                    <TextField required sx={{width: "49%"}} id="outlined-basic" label="Prénom" variant="outlined" name='prenom' />
                                </Box>
                                <TextField required fullWidth id="outlined-basic" label="Email professionnel" variant="outlined" name='email_pro'/>
                                <TextField required fullWidth id="outlined-basic" label="Email" variant="outlined" name='email'/>
                                <TextField required fullWidth id="outlined-basic" label="Mot de passe" variant="outlined" name='password'/>
                                <TextField required fullWidth id="outlined-basic" label="Confirmer mot de passe" variant="outlined" name='confirm-password'/>
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <TextField required sx={{width: "49%"}} id="outlined-basic" label="Numéro de téléphone" variant="outlined" name='tel_primaire'/>
                                    <TextField sx={{width: "49%"}} id="outlined-basic" label="Numéro de téléphone secondaire" variant="outlined" name='tel_secondaire' />
                                </Box>
                                {/* <LocationInput /> */}
                                <TextField required fullWidth id="outlined-basic" label="Numéro de Siret" variant="outlined" name='siret'/>
                                <TextField required fullWidth id="outlined-basic" label="Siège social" variant="outlined" name='siege_social'/>
                                <input type="hidden" name="role" value="ROLE_PHOTOGRAPHE" />
                            </Box>
                            <Button size='large' sx={{alignSelf:'center', mt:'25px', py:'15px', px:'30px'}} variant="contained" type="submit">VALIDER L'INSCRIPTION</Button>
                        </form>

                        <Button 
                            onClick={props.handleClickOpenSignIn}
                            sx={{
                                mt: '25px',
                                color: 'secondary.main',
                                fontWeight: 'bold',
                                fontSize: '10px',
                                width: 'fit-content',
                                alignSelf: 'center',
                                marginBottom: '50px',
                            }}
                        >
                            Vous avez déjà un compte?
                            <br></br>
                            Connectez vous
                        </Button>
                    </Box>
                </TabPanel>

            </SwipeableViews>
        </Box>
    </Box>
  );
}