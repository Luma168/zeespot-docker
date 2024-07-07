import { KeyboardArrowUp} from "@mui/icons-material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Fab, Zoom, useScrollTrigger } from "@mui/material"
import React, { useCallback } from "react"

const ScrollUpButton = () => {
    // Use `window` instead of `body` as `document` will be `undefined` when the
    // hooks first runs. By default, useScrollTrigger will attach itself to `window`.
    // const trigger = useScrollTrigger({
    //   // Number of pixels needed to scroll to toggle `trigger` to `true`.
    //   threshold: 100,
    // })
  
    const scrollToTop = useCallback(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
  
    return (
      // <Zoom in={trigger}>
        <Box
          role="presentation"
          // Place the button in the bottom right corner.
          sx={{
            position: "fixed",
            bottom: '55%',
            right: 32,
            zIndex: 1,
          }}
        >
          <Fab
            onClick={scrollToTop}
            color="primary"
            size="large"
            aria-label="Scroll back to top"
          >
            <KeyboardArrowUp fontSize="large"/>
          </Fab>
        </Box>
      //</Zoom>
    )
  }


const ScrollDownButton = () => {
  const scrolltobottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }, [])

  return (
      <Box
        role="presentation"
        // Place the button in the bottom right corner.
        sx={{
          position: "fixed",
          bottom: '45%',
          right: 32,
          zIndex: 1,
        }}
      >
        <Fab
          onClick={scrolltobottom}
          color="primary"
          size="large"
          aria-label="Scroll to bottom"
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </Fab>
      </Box>
  )
}
  
  export {ScrollUpButton, ScrollDownButton};