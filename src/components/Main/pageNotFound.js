import animationData from "../../assets/lotte/84178-404-error.json";
import Lottie from "react-lottie";
import React from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";

const pageNotFound = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <>
            <div className="d-flex justify-content-center" style={{top: "10%"}}>
                <Button className="text-center">
                    <Link to="/">Go Home</Link>
                </Button>
            </div>
            <div style={{ left: "50%"}}>
                <Lottie
                    options={defaultOptions}
                />
            </div>
        </>
    )
}
export default pageNotFound;