import React from "react";
import {Container} from "react-bootstrap";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import "./privacy.css"

const ReturnRefund = () => {
    return(
        <>
            <NavBar/>
            <Container>
                <div className="mx-auto">
                    <div>
                        <div className="container mx-auto shadow-md bg-white" data-v-ebf2a460>
                            <div className="my-3 md:flex p-3 py-6" data-v-ebf2a460>
                                <div className="content" data-v-ebf2a460><h3 data-v-ebf2a460>Refund and Return Policy</h3>
                                    <p className="_subtitle1" data-v-ebf2a460>
                                        General Information All orders are subject to product availability. If an item
                                        is not in stock at the time you place your order, we will notify you to either.
                                    </p>
                                    <p data-v-ebf2a460>1. keep the credit at your Selften wallet;</p>
                                    <p data-v-ebf2a460>2. Change to other item;</p>
                                    <p data-v-ebf2a460>
                                        3. or refund you the total amount of your order with 10% fee we take.
                                    </p></div>
                            </div>
                        </div>
                    </div>
                </div>


            </Container>
            <div className="min-height">
                <Footer />
            </div>
    </>

    )
}

export default ReturnRefund