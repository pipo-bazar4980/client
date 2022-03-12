import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form, Modal, Table, Row, Col } from "react-bootstrap";
import AddBanner from "./Child/Add Banner";
import { deleteBanner, findAllBanner, updateBanner } from "../../Api/utility";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { userInfo } from '../../utils/auth';
import { API } from '../../utils/config';
import { notify } from '../../utils/notification'

const CarouselComp = () => {

    const [lgShow, setLgShow] = useState(false);
    const [banner, setBanner] = useState([])
    const [remove, setRemove] = useState(false);
    const [edit, setEdit] = useState(false);
    const [ids, setId] = useState('')
    const [editId, setEditIds] = useState('')
    const { token } = userInfo();

    useEffect(() => {
        findAllBanner()
            .then((res) => {
                let allData = res.data
                setBanner(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [banner]);


    const [editBanner, setEditBanner] = useState({
        firstTitle: '',
        secondTitle: '',
        link: '',
        formData: '',
    });

    const [values, setValues] = useState({
        success: false,
        alert: false
    })
    const { success, alert } = values;
    const { firstTitle, secondTitle, link, formData } = editBanner

    useEffect(() => {
        setEditBanner({
            ...editBanner,
            formData: new FormData()
        })
    }, [])


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

    const handleSubmit = (e) => {
        e.preventDefault()
        deleteBanner(token, ids)
            .then(response => notify('Banner Delete Successfully'))
            .catch(err => notify('Something Failed! Please try again'))
    }

    const handleShowEdit = (id) => () => {
        setEdit(true)
        setEditIds(id)
    }

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setEditBanner({
            ...editBanner,
            [e.target.name]: value,
        })
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        setEditBanner({
            ...editBanner
        })
        const { token } = userInfo();
        updateBanner(token,editId, formData)
            .then(response => {
                setEditBanner({
                    firstTitle: '',
                    secondTitle: '',
                    link: '',
                    success: true,
                })
                notify("Banner Updated successfully!")
                setTimeout(reloadPage, 5000)
            })
            .catch(err => {
                console.log(err.response.data)
                let errMsg = "Something went wrong!";
                if (err.response) errMsg = err.response.data;
                notify(errMsg)
                setTimeout(reloadPage, 5000)
            })
    }

    const reloadPage = () => {
        window.location.reload(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <AddBanner />
                </Card.Body>
            </Card>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: "10%" }}>Image</th>
                        <th>First Title</th>
                        <th>Second Title</th>
                        <th>Link</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {banner && banner.filter(filteredData => filteredData.disabled === false).map((data, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td><img src={`${API}${data.image}`} alt="banner" /></td>
                                <td>{data.firstTitle}</td>
                                <td>{data.secondTitle}</td>
                                <td>{data.link}</td>
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
                            <Button onClick={handleCloseDelete} type="submit" variant="primary">
                                Yes Delete
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={edit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-around">
                        <Form.Label>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Upload a file</Form.Label>
                                            <Form.Control type="file" name="image" onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="addGame">
                                            <Form.Label>First Title</Form.Label>
                                            <Form.Control placeholder="firstTitle" type="firstTitle" name="firstTitle" value={firstTitle} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="addGame">
                                            <Form.Label>Second Title</Form.Label>
                                            <Form.Control placeholder="Second Title" type="secondTitle" name="secondTitle" value={secondTitle} onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control placeholder="Link" type="link" name="link" value={link} onChange={handleChange} />
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
}


export default CarouselComp