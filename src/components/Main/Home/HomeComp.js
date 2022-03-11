import React, { useEffect, useState } from "react";
import "./home.css"
import Carousol from "./Carousol";
import GameCart from "./GameCart";
import {Card, Col, Modal, Row} from "react-bootstrap";
import animationData from "../../../assets/lotte/78259-loading.json";
import { findPopUpBanner } from "../../../Api/poupbanner";
import { API } from "../../../utils/config";
let off=false;

const HomeComp = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [getImage, SetGetImage] = useState({})

    useEffect(() => {
        findPopUpBanner()
            .then((res) => {
                let allData = res.data
                SetGetImage(allData)
                if (allData.activeStatus === "active" && off===false) {
                    setShow(true)
                }
                else {
                    setShow(false)
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    },[getImage]);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const closePopUp = () => {
        off=true
    }
    return (
        <>
            <Modal show={show} size='lg' style={{ backgroundColor: 'transparent', padding: 0 }} onHide={handleClose}>
                <Modal.Header closeButton onClick={closePopUp}>
                </Modal.Header>
                <Modal.Body closeButton>
                    <Row >
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <img style={{align : "center"}} height="400px" width="400px" src={`${API}${getImage.image}`} alt="banner" />
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} >

                                  <div style={{padding : 5}}> {getImage.text}</div>

                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            <div class="mx-auto top-nav" data-v-791b20d9>
                <div data-v-791b20d9>
                    <div data-v-791b20d9>
                        <section class="pt-2">
                            <div class="container">
                                <div id="example"
                                    class="home_banner_wrapper rounded-r-[6px] rounded-l-[6px] md:mt-0 md:rounded-none">
                                    <div class="block home_banner_and_category_wrapper">
                                        <div>
                                            <Carousol />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="container my-10" style={{ padding: '0 !important' }}>
                            <div class=" ">
                                <h3 class="uppercase h_3">New Games</h3>
                                <GameCart />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeComp