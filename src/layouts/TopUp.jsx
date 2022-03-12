import React,{useEffect} from "react";
import TopUpComp from "../components/Main/TopUp/TopUp";
import NavBar from "./NavBar";
import Footer from "../components/Main/Footer";

const TopUp = () => {

    useEffect(() => {
        localStorage.removeItem('values');
    }, []);

    return (
        <>
            <TopUpComp />
        </>
    )
}

export default TopUp