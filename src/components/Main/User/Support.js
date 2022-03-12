import React, { useState } from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "../../User/User.css";
import { Form } from "antd";
import { notify } from "../../../utils/notification";
import { userInfo } from "../../../utils/auth";
import { createSupport } from "../../../Api/support";
import Lottie from "react-lottie";
import animationData from "../../../assets/lotte/89983-contect.json";

const Support = () => {


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
            <NavBar />
            <Container data-server-rendered="true" id="__nuxt">
                <div className="mt-10 mb-10" id="__layout">
                    <Form data-v-791b20d9>
                        <div style={{ minHeight: "90vh !important" }} data-v-791b20d9>
                            <Row>
                                <Col md={4}>
                                    <div className="">
                                        <h1 className="text-2xl md:text-4xl mb-2 text-gray-800 font-semibold">
                                            Contact Us
                                        </h1>
                                        <div className="pr-2">
                                            <Lottie
                                                options={defaultOptions}
                                            // height={400}
                                            // width={400}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <button className="btn" style={{ backgroundColor: "#299078", border: "none",marginTop:"100px" }}>Connect to WhatsApp</button>
                                    <div className="pr-8">
                                        <div
                                            className="mt-5 border-l-4  pl-4 py-2 shadow-md" style={{borderColor:"#299078"}}>
                                            <h3 className="text-gray-800 text-lg p-0 font-semibold">
                                                Email Us
                                            </h3>
                                            <p className="text-gray-600 text-base">
                                                <a href="mailto:bdgamesbazar@gmail.com">
                                                    bdgamesbazar@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                        <div
                                            className="mt-5 border-l-4 pl-4 py-2 shadow-md" style={{borderColor:"#299078"}}>
                                            <h3 className="text-gray-800 text-lg p-0 font-semibold">
                                                Call Us
                                            </h3>
                                            <p className="text-gray-600 text-base">
                                                01736472680
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    );
};
export default Support;
