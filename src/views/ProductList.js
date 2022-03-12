import React, { Fragment, useState, useEffect } from "react";
import {
    AiOutlineDelete,
    AiOutlineEdit, AiOutlineUpload,
} from "react-icons/ai";
import { Card, Row, Col, Button, Form, Modal } from "react-bootstrap";
import ProductUpdate from "../components/product/ProductUpdate";
import { deleteOneProducts } from "../Api/products";
import { notify } from '../utils/notification'
import { API } from '../utils/config';
import { userInfo } from "../utils/auth";
import {Chip} from "@mui/material";

const ProductList = ({ data }) => {

    const id = data._id
    const [update, setUpdate] = useState(false);
    const [remove, setRemove] = useState(false);
    const { token } = userInfo();

    const handleClose = () => setUpdate(false);

    const handleShow = () => setUpdate(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        deleteOneProducts(token, id)
            .then(response => notify('Product Delete Successfully'))
            .catch(err => notify('Something Failed! Please try again'))
    }

    const handleCloseDelete = () => {
        setRemove(false)
    }

    const handleShowDelete = () => setRemove(true);

    return (
        <Fragment>
            <Row>
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Card>
                        <Card.Img
                            variant="top"
                            className="cart_image"
                            src={`${API}${data.images}`}
                        />
                        <Card.Body>
                            <Card.Title className="text-dark bg-white text-center">
                                {data.gameName}
                            </Card.Title>
                            <Row className='mt-4'>
                                <Col className="text-center text-lg">
                                    <Button variant="light">
                                        <AiOutlineEdit onClick={handleShow} size={24} />
                                    </Button>
                                </Col>
                                <Col className="text-center">
                                    <Button variant="light">
                                        <AiOutlineDelete onClick={e => handleShowDelete(e)} size={24} />
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={8} xl={9}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    Game Name
                                    <Card>
                                        <Card.Body>
                                            {data.gameName}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    Category Name
                                    <Card>
                                        <Card.Body>
                                            {data.categoryName}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {data.topUp.map((product, index) => {
                                    return (
                                        <div key={index} style={{marginRight: 10, marginTop: 10}}>
                                            <Chip color="primary" variant="outlined"
                                                label={`${product.option},     (${product.price}Taka)`}
                                            />

                                        </div>
                                    )
                                })}
                            </div>
                            <Form>
                                <Modal show={update} size='lg' onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title ><div style={{marginLeft: 10}}>Update Product</div></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body ><ProductUpdate  id={id} /></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>

                            <Modal show={remove} size='lg' onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete Item</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={e => handleSubmit(e)}>
                                        <div className="d-flex justify-content-around">
                                            <Form.Label>Do you want to delete this item?</Form.Label>
                                            <Button type="submit" variant="primary">
                                                Yes Delete
                                            </Button>
                                        </div>

                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDelete}>
                                        No
                                    </Button>
                                    <Button onClick={handleCloseDelete} type="submit" variant="primary"
                                    >
                                        Done
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
};

export default ProductList