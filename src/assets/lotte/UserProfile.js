import React, {Fragment, useEffect, useState} from "react";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal, Col, Row,} from "react-bootstrap";
import "./userinfo.css"
import { userInfo } from '../../../utils/auth';
import NavBar from "../../../components/Main/Navbar/TopNav";
import Footer from "../../../components/Main/Footer";
import {getOneUser} from "../../../Api/user";
import {adminProfileUpdate} from "../../../Api/userAdmin";
import {API} from "../../../utils/config";
import {BsPencilSquare} from "react-icons/bs"
import Avatar from "antd/es/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";



const UserProfile = () => {
    const [show, setShow] =  useState(false)
    const [remove, setRemove] = useState(false);
    const handleCloseRemove = () => setRemove(false);
    const handleShowRemove = () => setShow(false);
    const {token, id} = userInfo();


    const [admin, setAdmin] = useState(
        {
            username: '',
            email: '',
            password: '',
            phonenumber: '',
            formData: '',
        }
    )
    const [name, setName] = useState({
        username: '',
        profilePic: ''
    })
    const {username, email, password, phonenumber, image, formData} = admin

    useEffect(() => {
        getOneUser(token, id)
            .then(response => setAdmin(response.data))
            .then(response => setAdmin({formData: new FormData()}))
    }, [admin]);

    useEffect(() => {
        getOneUser(token, id).then(response => setName(response.data))
    })
    useEffect(() => {
        setAdmin({
            ...admin,
            formData: new FormData()
        })
    }, [])

    useEffect(() => {
        localStorage.removeItem('values');
    }, []);

    const handleChange = (e) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAdmin({
            ...admin,
            [e.target.name]: value,
        })

    }

    const handleSubmit = e => {
        e.preventDefault();
        adminProfileUpdate(token, id, formData)
    }


    const showProfileEdit = () => {
        if (show){
            return(
                <Form onSubmit={handleSubmit}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Full Name</Form.Label>
                                        <Row>
                                            <Col md={11} sm={11}>
                                                <Form.Control type="username" name='username'
                                                              placeholder="Enter Full Name" value={username}
                                                              onChange={handleChange} />
                                            </Col>
                                            <Col md={1} sm={1} className="mt-2 font-medium">
                                                <BsPencilSquare style={{fontSize: 'x-large'}}/>
                                            </Col>
                                        </Row>


                                    </Form.Group>
                                </Col>

                                <Col md={6} sm={12}>
                                    <Form.Group as={Col} controlId="formGrid">
                                        <Form.Label>Email</Form.Label>
                                        <Row>
                                            <Col md={11} sm={11}>
                                                <Form.Control type="email" name='email' placeholder="Enter Email"
                                                              value={email} onChange={handleChange} />
                                            </Col>
                                            <Col md={1} sm={1} className="mt-2 font-medium">
                                                <BsPencilSquare style={{fontSize: 'x-large'}} />
                                            </Col>
                                        </Row>

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Group as={Col} controlId="formGridE">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Row>
                                            <Col md={11} sm={11}>
                                                <Form.Control type="phonenumber" name='phonenumber'
                                                              placeholder="Enter Phone Number" value={phonenumber}
                                                              onChange={handleChange} />
                                            </Col>
                                            <Col md={1} sm={1} className="mt-2 font-medium">
                                                <BsPencilSquare style={{fontSize: 'x-large'}}  />
                                            </Col>
                                        </Row>

                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" name="image" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Group as={Col} controlId="formGridEml">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name='password'
                                                      placeholder="Enter password" value={password}
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name='password'
                                                      placeholder="Enter password" value={password}
                                                      onChange={handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <Button className="m-4" onClick={handleShowRemove}
                                            variant="outline-primary">Close</Button>
                                </div>
                                <div>
                                    <Button type="submit" className="m-4"
                                            variant="outline-primary" >Update</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                </Form>
            )
        }

    }

    function showProfile() {
        setShow(true)
    }

    const avatars = () => (
        <Avatar size="large" icon={<UserOutlined />} />
    )

    return (
        <>
            <NavBar/>
            <Container>
                <Row className="mt-4" style={{minHeight:  "50rem"}}>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="card-image">
                                <img
                                    alt="..."
                                    src={
                                        require("assets/img/photo-1511512578047-dfb367046420.jpg")
                                            .default
                                    }
                                />
                            </div>

                            <Card.Body>
                                <div className="author mt-5">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <Avatar  size="large" icon={<UserOutlined />} />
                                    </a>
                                    <div className="description text-black">Hi {name.username}</div>
                                    <span>Howdi!</span>

                                    <div className="mt-4">
                                        Your Registered Email :  {name.email}
                                    </div>
                                    <div>
                                        Your Registered Phone Number :  {name.phonenumber}
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={showProfile}>Edit Profile</Button>
                            </Card.Footer>
                            <hr/>
                        </Card>
                    </Col>
                    <Col md="8">
                        {showProfileEdit()}
                    </Col>

                </Row>
            </Container>
            <Modal show={remove} onHide={handleCloseRemove}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete this Account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemove}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleCloseRemove}>
                        Yes Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer/>

        </>
    )
}

export default UserProfile