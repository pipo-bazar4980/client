import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { getOrders } from "../Api/order";
import { userInfo } from '../utils/auth';

import Tables from "./TableUser";
import Pagination from "./Pagination";
import Tabless from "./TableOrder";
import Tablesss from "./TableCancelOrder"
let totalActive, totalComplete, totalCancel;

const Orders = () => {
    const [activeOrders, setActiveOrders] = useState([])
    const [completeOrders, setCompleteOrders] = useState([])
    const [cancelledOrders, setCancelledOrders] = useState([])
    const { token, id } = userInfo();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [currentPages, setCurrentPages] = useState(1);
    const [postsPerPages] = useState(10);
    const [currentPagess, setCurrentPagess] = useState(1);
    const [postsPerPagess] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrders(token)
            .then(response => {
                const data = response.data
                const active = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false)
                const complete = data && data.filter(filteredData => filteredData.isComplete === true && filteredData.reject === false)
                const cancel = data && data.filter(filteredData => filteredData.reject === true)
                setActiveOrders(active)
                totalActive = active.length;
                setCompleteOrders(complete)
                totalComplete = complete.length;
                setCancelledOrders(cancel)
                totalCancel = cancel.length;
            })
    }, [])


    const searchOrders = (e) => {
        let searchTerm = e.currentTarget.value
        getOrders(token)
            .then(res => {
                if (res.data) {
                    filterContent(res.data, searchTerm)
                }
            })
    }



    const filterContent = (orders, searchTerm) => {
        const result = orders.filter((order) =>
            ((parseInt(order.orderId)).toString()).includes(searchTerm) ||
            order.productId?.gameName?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            order.productId?.categoryName?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            order.purchaseId?.product?.option?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            ((parseInt(order.purchaseId?.product?.price)).toString()).includes(searchTerm) ||
            ((parseInt(order.userId?.userIdNo)).toString()).includes(searchTerm)
        )
        let value = result.filter(filteredData => filteredData.isComplete === true && filteredData.reject === false)
        setCompleteOrders(value)

        let value2 = result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false)
        setActiveOrders(value2)

        let value3 = result.filter(filteredData => filteredData.reject === true)
        setCancelledOrders(value3)
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = activeOrders.slice(indexOfFirstPost, indexOfLastPost);

    const indexOfLastPosts = currentPages * postsPerPages;
    const indexOfFirstPosts = indexOfLastPosts - postsPerPages;
    const currentPosts = completeOrders.slice(indexOfFirstPosts, indexOfLastPosts);

    const indexOfLastPostss = currentPagess * postsPerPagess;
    const indexOfFirstPostss = indexOfLastPostss - postsPerPagess;
    const currentPostss = cancelledOrders.slice(indexOfFirstPostss, indexOfLastPostss);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginates = pageNumber => setCurrentPages(pageNumber);
    const paginatess = pageNumber => setCurrentPagess(pageNumber);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <div style={{ float: "right", width: "300px", marginBottom: "10px" }}>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                name="serachTerm"
                                onChange={searchOrders}
                            >
                            </input>
                        </div>
                    </Col>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Active Orders</Card.Title>
                                <p className="card-category">
                                    Total active orders: {totalActive}
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th className="border-0">Order ID</th>
                                            <th className="border-0">User ID</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Purchased Package</th>
                                            <th className="border-0">Order Status</th>
                                            <th className="border-0">Order Date</th>
                                            <th className="border-0">HandOver Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Tables activeOrders={currentPost} loading={loading} paginate={currentPage} />
                                    </tbody>
                                </Table>
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={activeOrders.length}
                                    paginate={paginate}
                                />

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Completed Orders</Card.Title>
                                <p className="card-category">
                                    Total completed orders: {totalComplete}
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th className="border-0">Order ID</th>
                                            <th className="border-0">User ID</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Purchased Package</th>
                                            <th className="border-0">Order Status</th>
                                            <th className="border-0">Order Date</th>
                                            <th className="border-0">HandOver Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Tabless completeOrders={currentPosts} loading={loading} paginate={currentPages} />
                                    </tbody>
                                </Table>
                                <Pagination
                                    postsPerPage={postsPerPages}
                                    totalPosts={completeOrders.length}
                                    paginate={paginates}
                                />

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Cancelled Orders</Card.Title>
                                <p className="card-category">
                                    Total cancelled orders: {totalCancel}
                                </p>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th className="border-0">Order ID</th>
                                            <th className="border-0">User ID</th>
                                            <th className="border-0">Product Name</th>
                                            <th className="border-0">Purchased Package</th>
                                            <th className="border-0">Order Status</th>
                                            <th className="border-0">Order Date</th>
                                            <th className="border-0">HandOver Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Tablesss cancelledOrders={currentPostss} loading={loading} paginate={currentPagess} />
                                    </tbody>
                                </Table>
                                <Pagination
                                    postsPerPage={postsPerPagess}
                                    totalPosts={cancelledOrders.length}
                                    paginate={paginatess}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Orders