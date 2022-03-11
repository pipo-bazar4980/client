
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";
import { userInfo } from '../../utils/auth';
import { deleteAllProduct } from "../../Api/user";
import { updateUserActiveStatus } from "../../Api/user";
import { getNotifications,editNotifications } from '../../Api/notification'
import {removeJwt} from "../../Api/user";

function Header() {
    const [notifications, setNotifications] = useState([]);
    const [viewNotifications, setViewNotifications] = useState([]);
    const { token, id } = userInfo();
    const location = useLocation();
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        const node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    useEffect(() => {
        getNotifications(token, id)
            .then(res => {
                if (res.data[0]) {
                    setNotifications(res.data[0].notifications)
                    setViewNotifications(res.data[0].view)
                }
            })
    }, [notifications]);


    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    const logout = (e) => {
        e.preventDefault()
        removeJwt()
        updateUserActiveStatus('inActive')
        deleteAllProduct()
        localStorage.clear()
    }

    const viewNotification=()=>{
        editNotifications(token,id)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                    <span className="navbar-toggler-bar burger-lines" />
                    <span className="navbar-toggler-bar burger-lines" />
                    <span className="navbar-toggler-bar burger-lines" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                data-toggle="dropdown"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                className="m-0"
                            >
                                <i className="nc-icon nc-palette" />
                                <span className="d-lg-none ml-1">Dashboard</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle
                                as={Nav.Link}
                                data-toggle="dropdown"
                                id="dropdown-67443507"
                                variant="default"
                                className="m-0"
                                
                            >
                                <i className="nc-icon nc-planet" onClick={viewNotification}/>
                                {viewNotifications === false && <>
                                    <span className="notification"></span>
                                    
                                </>}
                                <span className="d-lg-none ml-1" >Notification</span>

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {notifications && notifications.map((notification, index) => (
                                    <Dropdown.Item >
                                        {notification}
                                    </Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >

                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto" navbar>

                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                onClick={(e) => logout(e)}

                            >
                                <Link to="/login" className="no-icon">Log out</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
