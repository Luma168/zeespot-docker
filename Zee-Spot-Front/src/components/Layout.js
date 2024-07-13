import React from "react";
import Navbar from "./common/navbar/Navbar";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Layout(){
    return(
        // <>
        //     <Navbar />
        //     <Outlet />
        //     <Footer />
        // </>

        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Navbar />
            <Box sx={{ overflow: 'auto' }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}