import React,{useEffect} from "react";
import Confirm from "../components/Main/Confirmation/Confirm";

const Confirmation = () => {
    useEffect(() => {
        localStorage.removeItem('values');
    }, []);

    return(
        <><Confirm/></>
    )
}

export default Confirmation