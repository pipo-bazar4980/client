import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from '../Footer'
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import GameList from "../Home/ChildComp/GameList";

const Search = (data) => {
    const product = data.location.state
    return (
        <>
            <NavBar/>
            <Container>
                <Row className="mt-4">
                    {product.map((product, index) => {
                        if (product.disabled === false) {
                            return (
                                <Col key={product._id} sm={6} md={4} lg={2} xl={2} className="mb-4 text-decoration-none">
                                    <Link to={`topUp-${product._id}`}><GameList data={product} /></Link>
                                </Col>
                            );
                        }
                    })}
                </Row>
            </Container>

            <Footer/>
        </>
    )
}

export default Search