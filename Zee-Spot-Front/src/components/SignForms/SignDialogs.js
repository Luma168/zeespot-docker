import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Dialog, Slide, Typography} from "@mui/material";
import SignUpTabs from './SignUp/SignUpTabs';
import SignIn from './SignIn/SignIn';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [openSignIn,setOpenSignIn] = React.useState(false)
  const [openSignUp,setOpenSignUp] = React.useState(false)

  function handleClickOpenSignUp() {
    setOpenSignUp(true)
    setOpenSignIn(false)
  }

  function handleClickOpenSignIn() {
    setOpenSignIn(true)
    setOpenSignUp(false)
  }

  function handleClose() {
    setOpenSignIn(false)
    setOpenSignUp(false)
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickOpenSignIn}>
        <Avatar 
            sx={{
                width: 64, 
                height: 64, 
                bgcolor:'primary.main', 
                color:'primary.main',
                border: 2
            }} 
        >
            <AccountCircleIcon 
                sx={{
                    fontSize: '60px',
                    color: 'secondary.main'
                }}
            />
        </Avatar>
      </Button>

      {/* Inscription */}
      <Dialog
        open={openSignUp}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth={true}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box mt={3} sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
          <Typography variant='letter'>I</Typography>
          <Typography variant='h1'>NSCRIPTION</Typography>
        </Box>
        <SignUpTabs 
          handleClose={handleClose} 
          handleClickOpenSignIn={handleClickOpenSignIn}
        />
      </Dialog>

      {/* Connexion */}
      <Dialog
        open={openSignIn}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth={true}
      >
        <SignIn 
            handleClose={handleClose} 
            handleClickOpenSignUp={handleClickOpenSignUp}
        />
      </Dialog>

    </React.Fragment>
  );
}