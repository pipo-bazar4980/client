import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { userInfo } from "../../../utils/auth";
import { deletePaymentMethod, findAllPaymentMethod,editPaymentMethod } from "../../../Api/paymentMethod";
import { API } from "../../../utils/config";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { notify } from "../../../utils/notification";

const PaymentMethod = () => {
    const [lgShow, setLgShow] = useState(false);
    const [banner, setBanner] = useState([])
    const [remove, setRemove] = useState(false);
    const [ids, setId] = useState('')
    const [edit, setEdit] = useState(false);
    const [editId, setEditIds] = useState('')
    const { token } = userInfo();

    const [editMethod, setEditMethod] = useState({
        name: '',
        number: '',
        formData: '',
    });

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled: false,
    })
    const { success, alert, disabled } = values;
    const { name, number, formData } = editMethod

    useEffect(() => {
        setEditMethod({
            ...editMethod,
            formData: new FormData()
        })
    }, [])

    useEffect(() => {
        findAllPaymentMethod()
            .then((res) => {
                let allData = res.data
                setBanner(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [banner]);


    const handleShowDelete = (id) => () => {
        setRemove(true)
        setId(id)
    };


    const handleCloseDelete = () => {
        setRemove(false)
    }

    const handleCloseEdit = () => {
        setEdit(false)
    }

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setEditMethod({
            ...editMethod,
            [e.target.name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        deletePaymentMethod(token, ids)
            .then(response => notify('Payment method Deleted Successfully'))
            .catch(err => notify('Something Failed! Please try again'))
    }


    const handleShowEdit = (id) => () => {
        setEdit(true)
        setEditIds(id)
    }


    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setEditMethod({
            ...editMethod
        })
        const { token } = userInfo();
        editPaymentMethod(token,editId, formData)
            .then(response => {
                setEditMethod({
                    name: '',
                    number: '',
                    success: true,
                })
                notify("Payment Method Updated!")
                setTimeout(reloadPage, 2000)
            })
            .catch(err => {
                notify("Something wrong!")
                setTimeout(reloadPage, 2000)
            })
    }

    const reloadPage = () => {
        window.location.reload(false)
    }

    const addForm = () => (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: "10%" }}>Image</th>
                        <th>Payment Method Name</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {banner && banner.filter(filteredData => filteredData.disabled === false).map((data, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td><img src={`${API}${data.image}`} alt="banner" /></td>
                                <td>{data.name}</td>
                                <td>{data.number}</td>
                                <td><Button variant="light">
                                    <AiOutlineEdit onClick={handleShowEdit(data._id)} size={24} />
                                </Button></td>
                                <td><Button><AiOutlineDelete onClick={handleShowDelete(data._id)}
                                    size={24} /></Button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}

                </tbody>
            </Table>
            <Modal show={remove} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <div className="d-flex justify-content-around">
                            <Form.Label>Do you want to delete this item? </Form.Label>
                            <Button type="submit" variant="primary" onClick={handleCloseDelete}>
                                Yes Delete
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={edit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-around">
                        <Form.Label>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Payment Method Name</Form.Label>
                                            <Form.Control type="name" placeholder="Payment Method Name" name='name' value={name} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Number</Form.Label>
                                            <Form.Control type="name" placeholder="Number" name='number' value={number} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Default file input example</Form.Label>
                                            <Form.Control type="file" name="image" onChange={handleChange} />
                                        </Form.Group>
                                    </Col>

                                </Row>

                            </Form>
                        </Form.Label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" onClick={handleSubmitEdit}>
                        Update product
                    </Button>
                    <Button className="ml-5" onClick={handleCloseEdit} type="submit" variant="primary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return (
        <div>
            {addForm()}
        </div>
    )
}

export default PaymentMethod;