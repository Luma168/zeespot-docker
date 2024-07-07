import React from "react";
import Navbar from "./common/navbar/Navbar";
import Footer from "./common/Footer";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}