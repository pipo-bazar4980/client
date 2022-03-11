import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import "./privacy.css"
import {Container} from "react-bootstrap";
import {Card} from "antd";
import {CardBody} from "reactstrap";

const ShipmentInfo = () => {
    return (
        <>
            <NavBar/>
            <Container>
                <Card className="mt-5 mb-5">
                    <CardBody>
                        Selften Online Store supports all major shipping methods around the Bangladesh to make sure that your
                        order reaches you in the fastest possible manner. Deliveries can take anywhere between 4 - 7 days
                        depending on your shipping address. You can track your order using the tracking and delivery information
                        available in your orders list.
                    </CardBody>
                </Card>

            </Container>
            <div className="min-height">
                <Footer />
            </div>

        </>
    )
}
export default ShipmentInfo