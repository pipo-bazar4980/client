import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUser, updateUserRole } from '../Api/user';
import { passwordEdit } from "../Api/userAdmin";
import { userInfo } from '../utils/auth';
import './TableList.css';
import { notify } from '../utils/notification';
import { getAllWallet } from '../Api/wallet'
import { BsPencilSquare } from "react-icons/bs"
import { editBalance } from '../Api/wallet'
let userWalletId, walletUserName;
let userEmail, userName;

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
  Modal,
  Form
} from "react-bootstrap";
let userList;

function TableList() {
  const [adminList, setAdminList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [allWallet, setAllWallet] = useState([]);
  const [visible, setVisible] = useState(20);
  const [visibleAdmin, setVisibleAdmin] = useState(20);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => { setShow(false), setShow2(false) };
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const { token, role, id } = userInfo();

  useEffect(() => {
    getAllUserList()
  }, [])

  useEffect(() => {
    getAllWallet(token)
      .then(res => setAllWallet(res.data))
  }, [allWallet])


  const [walletBalance, setWalletBalance] = useState({
    amount: '',
    disabled: false
  });

  const [editPassword, setEditPassword] = useState({
    newPassword: '',
    newRePassword: ''
  });

  const { newPassword, newRePassword } = editPassword;


  const [disabled, setDisabled] = useState({
    disabledd: false
  });

  const { disabledd } = disabled

  const { amount } = walletBalance;

  const getAllUserList = () => {
    getAllUser(token)
      .then(response => {
        setAdminList(response.data)
        setAllUserList(response.data)
      })
  }

  const deleteUserById = (id) => () => {
    setDisabled({
      disabledd: true
    })
    deleteUser(token, id)
      .then((response) => {
        getAllUserList()
        notify('User Delete Successfully')
        setDisabled({
          disabledd: false
        })
      })
      .catch(err => {
        notify('Something went wrong')
        setDisabled({
          disabledd: false
        })
      })
  }


  const showMore = () => {
    setVisible((prevValue) => prevValue + 20)
  }

  const showLess = () => {
    setVisible((prevValue) => prevValue - 20)
  }

  const showMoreAdmin = () => {
    setVisibleAdmin((prevValue) => prevValue + 20)
  }

  const showLessAdmin = () => {
    setVisibleAdmin((prevValue) => prevValue - 20)
  }

  const searchForAdminList = (e) => {
    let searchTerm = e.currentTarget.value
    userList = false;
    getAllUser(token)
      .then(res => {
        if (res.data) {
          filterContent(res.data, searchTerm)
        }
      })
  }

  const searchForAllUserList = (e) => {
    let searchTerm = e.currentTarget.value
    userList = true;
    getAllUser(token)
      .then(res => {
        if (res.data) {
          filterContent(res.data, searchTerm)
        }
      })
  }


  const filterContent = (users, searchTerm) => {
    const result = users.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      user.phonenumber?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      ((parseInt(user.wallet?.currentAmount)).toString()).includes(searchTerm) ||
      ((parseInt(user.userIdNo)).toString()).includes(searchTerm)
    )

    if (userList === true) {
      let value = result.filter(filteredData => filteredData.role === 'user')
      setAllUserList(value)
    }
    else if (userList === false) {
      let value = result.filter(filteredData => filteredData.role === 'admin' || filteredData.role === 'superadmin')
      setAdminList(value)
    }

  }

  const modalOpen = (walletId, name) => () => {
    handleShow()
    userWalletId = walletId;
    walletUserName = name;
  }

  const handleChange = e => {
    setWalletBalance({
      ...walletBalance,
      [e.target.name]: e.target.value
    })
  }

  const handleChange2 = e => {
    setEditPassword({
      ...editPassword,
      [e.target.name]: e.target.value
    })
  }

  const editUserBalance = () => {
    handleClose();
    setWalletBalance({
      ...walletBalance,
      disabled: true
    })
    editBalance(token, userWalletId, parseInt(amount))
      .then(res => {
        setWalletBalance({
          amount: '',
          disabled: true
        })
        notify(`${walletUserName}'s wallet balance updated`)
      })
      .catch(err => {
        setWalletBalance({
          amount: '',
          disabled: false
        })
        notify(`Something went wrong. Please try again`)
      })
  }

  const modalOpen2 = (email, name) => () => {
    handleShow2()
    userEmail = email;
    userName = name;

  }

  const editUserPassword = async () => {
    if (newPassword !== newRePassword) {
      notify('password do not match')
    } else {
      const update = {
        newPassword: newPassword,
        email: userEmail
      }
      console.log(update)
      await passwordEdit(token, id, update).then(res => {
        notify('Password Updated')
        handleClose()
      })
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ margin: "40px 10px 0px 15px" }}>
          Edit {walletUserName}'s Wallet Balance
        </Modal.Header>
        <Modal.Body style={{ margin: "10px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter the amount</Form.Label>
              <Form.Control type="text" name="amount" placeholder="Enter amount" onChange={handleChange} style={{ width: "80%" }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editUserBalance}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose}>
        <Modal.Header style={{ margin: "40px 10px 0px 15px" }}>
          Edit {userName}'s password
        </Modal.Header>
        <Modal.Body style={{ margin: "10px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control type="password" name="newPassword" placeholder="Enter amount" onChange={handleChange2} style={{ width: "80%" }} />
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type="password" name="newRePassword" placeholder="Enter amount" onChange={handleChange2} style={{ width: "80%" }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editUserPassword}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <div style={{ float: "right", width: "300px" }}>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    name="serachTerm"
                    onChange={searchForAdminList}
                  >
                  </input>
                </div>
                <Card.Title as="h4">Admin List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">User ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No</th>
                      <th className="border-0">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList && adminList.slice(0, visibleAdmin).filter(filteredData => filteredData.role === 'admin' && filteredData.disabled === false).map((user, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.userIdNo}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phonenumber}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
                <button className='btn btn-primary mr-3' onClick={showMoreAdmin}>Show More...</button>
                <button className='btn btn-success' onClick={showLessAdmin}>Show Less...</button>
              </Card.Body>
            </Card>
          </Col>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <div style={{ float: "right", width: "300px" }}>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    name="serachTerm"
                    onChange={searchForAllUserList}
                  >
                  </input>
                </div>
                <Card.Title as="h4">User List:</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">User ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No</th>
                      <th className="border-0">Wallet Balance</th>
                      <th className="border-0">Role</th>
                      {(role === 'superadmin') && (<>
                        <th className="border-0"></th>
                      </>)}
                    </tr>
                  </thead>
                  <tbody>
                    {allUserList && allUserList.slice(0, visible).filter(filteredData => filteredData.role === 'user' && filteredData.disabled === false).map((user, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.userIdNo}</td>
                        <td>{user.username} {user.vipBatch === true && (<><span style={{ color: "blue", fontSize: ".7rem", fontWeight: "bold" }}>* (VIP Batch)</span></>)}</td>
                        <td>{user.email}</td>
                        <td>{user.phonenumber}</td>
                        {allWallet && allWallet.map(wallet => {
                          if (user._id === wallet.userId) {
                            return (

                              <td><div className='d-flex justify-content-around'>
                                <div>{wallet.currentAmount}</div>
                                <div><BsPencilSquare style={{ fontSize: 'x-large', cursor: "pointer" }} onClick={modalOpen(wallet._id, user.username, wallet.currentAmount)} /></div>
                              </div></td>
                            )
                          }
                        })}
                        <td>{user.role}</td>
                        {(role === 'superadmin' || role === 'admin') && (<>
                          <td className="border-0"><button className='btn btn-danger' disabled={disabledd} onClick={modalOpen2(user.email, user.username)}>Edit Password</button></td>
                        </>)}
                        {(role === 'superadmin' || role === 'admin') && (<>
                          <td className="border-0"><button className='btn btn-danger' disabled={disabledd} onClick={deleteUserById(user._id)}>Delete</button></td>
                        </>)}
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
                <button className='btn btn-primary mr-3' onClick={showMore}>Show More...</button>
                <button className='btn btn-success' onClick={showLess}>Show Less...</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
