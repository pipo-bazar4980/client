import React, {useEffect, useState} from "react";
import {Card, Container} from "react-bootstrap";
import Img1 from "../../../assets/images/cover/3930.jpg"
import GameInfo from "./childs/GameInfo";
import Info from "./childs/Info"
import "./childs/gameinfo.css"
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer";
import "./topup.css"
import Lottie from 'react-lottie';
import animationData from "../../../assets/lotte/84272-loading-colour.json"
import {Button} from "react-bootstrap";
import {Box, Modal} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    border: 'none',
    boxShadow: 0,
    p: 4,
};

const TopUpComp = () => {

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [show, setShow] = useState(true);
    //
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    useEffect(
        countDown
    )

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    function countDown() {
        let secondsToGo = 2;
        const timer = setInterval(() => {
            secondsToGo -= 1;

        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            handleClose()
        }, secondsToGo * 1000);
    }
    return (
        <>
            <NavBar/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Lottie
                            options={defaultOptions}
                            height={400}
                            width={400}
                        />
                    </div>
                </Box>
            </Modal>
            {/*<Modal show={show} onHide={handleClose}>*/}

            {/*</Modal>*/}

            <Container style={{fontWeight: "bold"}}>
                <div className="imageGone">
                    <Card className="bg-dark text-white mt-4 mb-4">
                        <Card.Img src={Img1} alt="Card image"/>
                        <Card.ImgOverlay>
                            <GameInfo/>
                        </Card.ImgOverlay>
                    </Card>
                </div>
                <div className="backCard m-4 text-black">
                    <GameInfo/>
                </div>
                <Info/>
            </Container>
            <Footer/>
        </>
    )
}

export default TopUpComp