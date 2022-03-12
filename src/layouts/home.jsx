import React, { useEffect, useState } from "react";
import { increaseVisitors } from '../Api/visitors';
import HomeComp from "../components/Main/Home/HomeComp";
import NavBar from "../components/Main/Navbar/Navbar";
import Footer from "../components/Main/Footer"
//import Cookies from 'js-cookie';
///import Cookies from 'universal-cookie';
//import { useCookies } from 'react-cookie';

const Home = () => {

    useEffect(() => {
        increaseVisitors()
    }, [])

    useEffect(() => {
        localStorage.removeItem('values');
    }, []);


    return (
        <>
            <NavBar />
            <HomeComp />
            <Footer />
        </>
    )
}
export default Home