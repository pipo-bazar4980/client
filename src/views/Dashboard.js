import React, { useState, useEffect } from "react";
import { getVisitorsPerDay } from '../Api/visitors';
import { oneDayOrder, totalRevenue, adminOrderQuery } from '../Api/orderCount';
import { getAllProducts, filterProductByDate } from '../Api/products';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const [count, setCount] = useState([]);
  const [orderCount, setOrderCount] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [revenue, setRevenue] = useState({});
  const [adminOrder, setAdminOrder] = useState([]);

  useEffect(() => {
    getVisitorsPerDay()
      .then(response => setCount(response.data))
  }, [])

  useEffect(() => {
    adminOrderQuery()
      .then(response => setAdminOrder(response.data))
  }, [])


  useEffect(() => {
    oneDayOrder()
      .then(response => setOrderCount(response.data))
  }, [])

  useEffect(() => {
    totalRevenue()
      .then(response => setRevenue(response.data))
  }, [])

  useEffect(() => {
    getAllProducts()
      .then(response => setAllProduct(response.data))
  }, [])



  console.log(revenue)
  const [searchProduct, setSearchProduct] = useState({
    productId: '',
    date: ''
  });

  let { productId, date } = searchProduct

  const [data, setData] = useState({
    totalOrders: null,
    totalIncome: null
  });

  let { totalOrders, totalIncome } = data;

  const handleChange = e => {
    setSearchProduct({
      ...searchProduct,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = e => {
    e.preventDefault();
    filterProductByDate({ date })
      .then(res => {
        setData({
          ...data,
          totalOrders: res.data.totalOrders,
          totalIncome: res.data.totalIncome,

        })
      })

  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Visitors</p>
                      {count && count.map(countTotal => (
                        <Card.Title as="h4">{countTotal.count}</Card.Title>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Body>

              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1" />
                  Total Visitors
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Orders</p>
                      <Card.Title as="h4">{orderCount.totalOrdersToday}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Orders</p>
                      <Card.Title as="h4">{orderCount.totalOrdersMonthly}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  This month
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Orders</p>
                      <Card.Title as="h4">{orderCount.totalOrdersYearly}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  This year
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Select date</Form.Label>
                        <Form.Control type="date" name="date" placeholder="Date of Birth" onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div>
                    <Button type="submit" variant="primary">
                      Search
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <p style={{ marginBottom: "10px" }}><span style={{ fontWeight: "bold" }}>Date:</span> {date}</p>

                <p><span style={{ fontWeight: "bold" }}>Total Orders:</span> {totalOrders}</p>
                <p><span style={{ fontWeight: "bold" }}>Total Income:</span> {totalIncome}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th className="border-0">Admin List</th>
                      <th className="border-0">Today's complete order</th>
                      <th className="border-0">Total complete order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminOrder && adminOrder.map((item,index) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.admin}</td>
                        <td>{item.today}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;