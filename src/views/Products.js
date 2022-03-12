import React, { useEffect, useState } from "react";
import { getProducts } from "../Api";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import ProductList from "./ProductList";
import ProductAdd from "../components/product/ProductAdd";
import "./product.css"

const Products = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProducts()
            .then((res) => {
                let allData = res.data
                setProduct(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [product]);


    return (
        <>
            <Button variant="primary"  className="mb-4" onClick={handleShow}>
                Add Products
            </Button>
            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><ProductAdd /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card>
                <Card.Body>
                    <Card.Title className="text-center">Product List</Card.Title>
                    <Row>
                        {product && product.map((product, index) => {
                            if (product.disabled === false) {
                                return (
                                    <Col key={index}
                                        lg="12" sm="12"
                                        className=" text-decoration-none">
                                        <div to={`category/${index}/${product.gameName}`}><ProductList key={index} data={product} />
                                        </div>
                                    </Col>
                                );
                            }
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
export default Products;