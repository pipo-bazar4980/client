import { BsPencilSquare } from "react-icons/bs";
import React, { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { updateAddWallet, findOneWallet, editBalance } from '../Api/addWallet';
import { updateWallet } from '../Api/wallet';
import { createNotifications } from '../Api/notification';
import { userInfo } from '../utils/auth';
import { notify } from '../utils/notification';
import moment from "moment";
import { sendMessageAPI } from '../Api/sendMessage'
let transactionId, transactionUser, transactionUserName, message, cancelAmount,transactionNum;

const OrderTables = ({ activePayment, loading, paginates, findActivePayment, findCompletePayment, findCancelledPayment }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [edit, setEdit] = useState(false);
    const handleCloseEdit = () => setEdit(false);
    const handleShowEdit = () => setEdit(true);
    const { token } = userInfo();


    const [walletBalance, setWalletBalance] = useState({
        amount: '',
        disabled: false
    });

    const { amount } = walletBalance;

    const handleChangeAmount = e => {
        setWalletBalance({
            ...walletBalance,
            [e.target.name]: e.target.value
        })
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const [note, setNote] = useState({
        noteText: '',
        disabled: false
    });

    const { noteText, disabled } = note;

    const markComplete = (id, transactionId, taka, phonenumber) => () => {
        setNote({
            ...note,
            disabled: true
        })
        let data = {
            isComplete: true
        }
        let sms = `${taka} Taka has been added to your sizishop wallet for TransactionId: ${transactionId}`
        let sendMessage = {
            number: phonenumber,
            message: sms.replaceAll(" ", "%20")
        }
        updateAddWallet(token, id, data)
            .then(response => {
                findOneWallet(token, id)
                    .then(response => {
                        const walletId = response.data.walletId;
                        const amount = response.data.amount;
                        const walletUser = response.data.userId;
                        const spent = 0
                        updateWallet(token, walletId, amount, spent)
                            .then(res => {
                                notify('Transaction confirmed!')
                                //sendMessageAPI(sendMessage)
                                createNotifications(token, walletUser, `${taka} Taka has been added to your wallet for TransactionId: ${transactionId}`)
                                findActivePayment()
                                findCompletePayment()
                                setTimeout(reloadPage, 3000)
                            })
                            .catch(err => {
                                let data = {
                                    isComplete: false
                                }
                                updateAddWallet(token, id, data)
                                    .then(response => {
                                        findActivePayment()
                                        notify('Something Failed! Please try again')
                                        setNote({
                                            ...note,
                                            disabled: false
                                        })
                                    })
                            })
                    })
                    .catch(err => {
                        setNote({
                            ...note,
                            disabled: false
                        })
                        notify('Something Failed! Please try again')
                    })
            })
            .catch(err => {
                let data = {
                    isComplete: false
                }
                updateAddWallet(token, id, data)
                    .then(response => {
                        findActivePayment()
                        notify('Something Failed! Please try again')
                        setNote({
                            ...note,
                            disabled: false
                        })
                    })
                    .catch(err => {
                        setNote({
                            ...note,
                            disabled: false
                        })
                    })
            })
    }


    const reloadPage = () => {
        setNote({
            ...note,
            disabled: false
        })
        window.location.reload(false)
    }

    const modalOpen = (id, userId, name, amount,tran) => () => {
        handleShow()
        transactionId = id
        transactionUser = userId
        transactionUserName = name
        cancelAmount = amount
        transactionNum=tran
    }

    const modalOpen2 = (id, userId, name, amount) => () => {
        handleShowEdit()
        transactionId = id
        transactionUser = userId
        transactionUserName = name
        cancelAmount = amount
    }

    const handleChange = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
        message = e.target.value
    }

    const createNote = () => {
        setNote({
            ...note,
            disabled: true
        })
        let data = {
            reject: true,
            message: `${message}`
        }

        updateAddWallet(token, transactionId, data)
            .then(res => {
                createNotifications(token, transactionUser, `Your tranaction has been canceled for ${cancelAmount} Taka (TransactionId: ${transactionNum}). Reason: ${message}`)
                    .then(res => {
                        findActivePayment()
                        handleClose()
                        notify('Transaction cancelled')
                        findCancelledPayment()
                        setTimeout(reloadPage, 3000)
                    })
            })
            .catch(res => {
                findActivePayment()
                notify('Something wrong! Please try again')
                setNote({
                    ...note,
                    disabled: false
                })
            })
    }

    const editUserAmount = () => {
        handleCloseEdit();
        setWalletBalance({
            ...walletBalance
        })
        editBalance(token, transactionId, parseInt(amount))
            .then(res => {
                setWalletBalance({
                    amount: ''
                })
                findActivePayment()
                notify(`${transactionUserName}'s transaction balance updated`)
            })
            .catch(err => {
                setWalletBalance({
                    amount: ''
                })
                notify(`Something went wrong. Please try again`)
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ margin: "30px 10px" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Why do you want to cancel this transaction?</Form.Label>
                            <Form.Control type="email" name="noteText" placeholder="Add a short note" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={createNote}>
                        Send
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={edit} onHide={handleCloseEdit} >
                <Modal.Header style={{ margin: "40px 10px 0px 15px" }}>
                    Edit {transactionUserName}'s transaction amount
                </Modal.Header>
                <Modal.Body style={{ margin: "10px" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter the amount</Form.Label>
                            <Form.Control type="text" name="amount" placeholder="Enter amount" onChange={handleChangeAmount} style={{ width: "80%" }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editUserAmount}>
                        Edit
                    </Button>
                    <Button variant="primary" onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {activePayment && activePayment.map((item, index) => (
                <tr>
                    <td>{(paginates - 1) * 10 + index + 1}</td>
                    <td>{item.userId?.userIdNo}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.transactionID}</td>
                    <td>{item.mobileNumber}</td>
                    <td><div className='d-flex justify-content-around'>
                        <div>{item.amount}</div>
                        <div className="ml-2"><BsPencilSquare style={{ fontSize: 'x-large', cursor: "pointer" }} onClick={modalOpen2(item._id, item.userId?._id, item.userId?.username, item.amount)} /></div>
                    </div></td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY, h:mm a')}</td>
                    <td>
                        <button className="btn btn-primary" disabled={disabled} onClick={markComplete(item._id, item.transactionID, item.amount, item.userId?.phonenumber)}>Mark as Complete</button>
                    </td>
                    <td>
                        <button className="btn btn-primary" disabled={disabled} onClick={modalOpen(item._id, item.userId?._id, item.userId?.username, item.amount,item.transactionID)}>Cancel</button>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default OrderTables;