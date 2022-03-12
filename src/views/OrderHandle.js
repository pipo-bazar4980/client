import React, { useEffect, useState } from "react";
import { adminProfile } from "../Api/userAdmin";
import { getAllProducts, filterAdminProduct } from "../Api/products";
import { updateUserActiveStatus, addProduct, deleteProduct } from "../Api/user";
import { Button, Select, Radio, Card } from "antd";
import { getOrdersByAdminId, updateOrderStatus } from '../Api/order'
import { userInfo } from '../utils/auth';
import { ButtonGroup, Col, Form, Row, ToggleButton, Table, Alert, Modal } from "react-bootstrap";
import { createNotifications } from '../Api/notification'
import { notify } from '../utils/notification'
import { AiTwotoneSkin, AiOutlineDelete, } from "react-icons/ai";
import { updateWallet, addSpentAmount, removeSpentAmount } from '../Api/wallet';
import { sendMessageAPI } from '../Api/sendMessage'
import moment from "moment";
import Tablessss from './inGameOrderTable';
import Tables from './idCodeOrderTable';
import Tabless from './cancelInGameOrderTable';
import Tablesss from './cancelIdcodeOrderTable';
import Tablesssss from './offerOrderTable';
import Tablessssss from './subscOrderTable';
import Tablesssssss from './cancelOfferOrderTable';
import Tablessssssss from './cancelSubscOrderTable';
import Pagination from "./Pagination";
let orderId, orderUser, game_name, category_name, game_option, game_price, message, paymentStatus;
let search = false;
let inGameTable = false, idCodeTable = false, offerTable = false, subscTable = false;
let totalIngame, totalIngameCancel, totalIdcode, totalIdcodeCancel, totalOffer, totalOfferCancel, totalSubsc, totalSubscCancel;

const OrderHandle = () => {
    const { token, id } = userInfo();
    const [product, setProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([])
    const [adminData, setAdminData] = useState([])
    const [idCodeOrders, setIdCodeOrders] = useState([])
    const [idCodeOrdersSearch, setIdCodeOrdersSearch] = useState([])
    const [inGameOrders, setInGameOrders] = useState([])
    const [inGameOrdersSearch, setInGameOrdersSearch] = useState([])
    const [offerOrders, setOfferOrders] = useState([])
    const [offerOrdersSearch, setOfferOrdersSearch] = useState([])
    const [subscOrders, setSubscOrders] = useState([])
    const [subscOrdersSearch, setSubscOrdersSearch] = useState([])
    const [cancelledOrdersInGame, setCancelledOrdersInGame] = useState([])
    const [cancelledOrdersIdCode, setCancelledOrdersIdCode] = useState([])
    const [cancelledOrdersOffer, setCancelledOrdersOffer] = useState([])
    const [cancelledOrdersSubsc, setCancelledOrdersSubsc] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [currentPages, setCurrentPages] = useState(1);
    const [postsPerPages] = useState(10);
    const [currentPagess, setCurrentPagess] = useState(1);
    const [postsPerPagess] = useState(10);
    const [currentPagesss, setCurrentPagesss] = useState(1);
    const [postsPerPagesss] = useState(10);
    const [currentPagessss, setCurrentPagessss] = useState(1);
    const [postsPerPagessss] = useState(10);
    const [currentPagesssss, setCurrentPagesssss] = useState(1);
    const [postsPerPagesssss] = useState(10);
    const [currentPagessssss, setCurrentPagessssss] = useState(1);
    const [postsPerPagessssss] = useState(10);
    const [currentPagesssssss, setCurrentPagesssssss] = useState(1);
    const [postsPerPagesssssss] = useState(10);


    const radios = [
        { name: 'InActive', value: 'inActive' },
        { name: 'Active', value: 'active' },
    ];

    useEffect(()=>{

    },[])

    useEffect(() => {
        adminProfile()
            .then((res) => {
                let allData = res.data
                setAdminData(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [adminData]);


    const [productsId, setProductsId] = useState([]);
    const [productId, setProductId] = useState({});

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                let allData = res.data
                setProduct(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        filterAdminProduct(id)
            .then((res) => {
                let allData = res.data
                setFilteredProduct(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [filteredProduct]);


    useEffect(() => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const cancelIdcode = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(IDCode)')
                setCancelledOrdersIdCode(cancelIdcode)
                totalIdcodeCancel = cancelIdcode.length
                const cancelIngame = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(InGame)')
                setCancelledOrdersInGame(cancelIngame)
                totalIngameCancel = cancelIngame.length
                const cancelOffer = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Offer)')
                setCancelledOrdersOffer(cancelOffer)
                totalOfferCancel = cancelOffer.length
                const cancelSubsc = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Subsc)')
                setCancelledOrdersSubsc(cancelSubsc)
                totalSubscCancel = cancelSubsc.length
            })
    }, []);

    useEffect(() => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const igame = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(InGame)')
                setInGameOrders(igame)
                totalIngame = igame.length
            })
    }, [inGameOrders]);

    useEffect(() => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const idcode = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(IDCode)')
                setIdCodeOrders(idcode)
                totalIdcode = idcode.length
            })
    }, [idCodeOrders]);

    useEffect(() => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const offer = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Offer)')
                setOfferOrders(offer)
                totalOffer = offer.length
            })
    }, [offerOrders]);

    useEffect(() => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const subsc = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Subsc)')
                setSubscOrders(subsc)
                totalSubsc = subsc.length
            })
    }, [subscOrders]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = inGameOrders.slice(indexOfFirstPost, indexOfLastPost);
    const currentPostSearch = inGameOrdersSearch.slice(indexOfFirstPost, indexOfLastPost);

    const indexOfLastPosts = currentPages * postsPerPages;
    const indexOfFirstPosts = indexOfLastPosts - postsPerPages;
    const currentPosts = idCodeOrders.slice(indexOfFirstPosts, indexOfLastPosts);
    const currentPostsSearch = idCodeOrdersSearch.slice(indexOfFirstPosts, indexOfLastPosts);

    const indexOfLastPostss = currentPagess * postsPerPagess;
    const indexOfFirstPostss = indexOfLastPostss - postsPerPagess;
    const currentPostss = cancelledOrdersInGame.slice(indexOfFirstPostss, indexOfLastPostss);

    const indexOfLastPostsss = currentPagesss * postsPerPagesss;
    const indexOfFirstPostsss = indexOfLastPostsss - postsPerPagesss;
    const currentPostsss = cancelledOrdersIdCode.slice(indexOfFirstPostsss, indexOfLastPostsss);

    const indexOfLastPostssss = currentPagessss * postsPerPagessss;
    const indexOfFirstPostssss = indexOfLastPostssss - postsPerPagessss;
    const currentPostssss = offerOrders.slice(indexOfFirstPostssss, indexOfLastPostssss);
    const currentPostssSearch = offerOrdersSearch.slice(indexOfFirstPostssss, indexOfLastPostssss);

    const indexOfLastPostsssss = currentPagesssss * postsPerPagesssss;
    const indexOfFirstPostsssss = indexOfLastPostsssss - postsPerPagesssss;
    const currentPostsssss = subscOrders.slice(indexOfFirstPostsssss, indexOfLastPostsssss);
    const currentPostsssSearch = subscOrdersSearch.slice(indexOfFirstPostsssss, indexOfLastPostsssss);

    const indexOfLastPostssssss = currentPagessssss * postsPerPagessssss;
    const indexOfFirstPostssssss = indexOfLastPostssssss - postsPerPagessssss;
    const currentPostssssss = cancelledOrdersOffer.slice(indexOfFirstPostssssss, indexOfLastPostssssss);


    const indexOfLastPostsssssss = currentPagesssssss * postsPerPagesssssss;
    const indexOfFirstPostsssssss = indexOfLastPostsssssss - postsPerPagesssssss;
    const currentPostsssssss = cancelledOrdersSubsc.slice(indexOfFirstPostsssssss, indexOfLastPostsssssss);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const paginates = pageNumber => setCurrentPages(pageNumber);
    const paginatess = pageNumber => setCurrentPagess(pageNumber);
    const paginatesss = pageNumber => setCurrentPagesss(pageNumber);
    const paginatessss = pageNumber => setCurrentPagessss(pageNumber);
    const paginatesssss = pageNumber => setCurrentPagesssss(pageNumber);
    const paginatessssss = pageNumber => setCurrentPagessssss(pageNumber);
    const paginatesssssss = pageNumber => setCurrentPagesssssss(pageNumber);



    const findInGameOrder = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const igame = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(InGame)')
                setInGameOrders(igame)
            })
    }

    const findIdCodeOrder = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const idcode = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(IDCode)')
                setIdCodeOrders(idcode)
            })
    }

    const findOfferOrder = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const offer = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Offer)')
                setOfferOrders(offer)
            })
    }

    const findSubscOrder = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const subsc = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Subsc)')
                setSubscOrders(subsc)
            })
    }

    const findInGameOrderCancel = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const cancelIngame = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(InGame)')
                setCancelledOrdersInGame(cancelIngame)
            })
    }

    const findIdCodeOrderCancel = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const cancelIdcode = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(IDCode)')
                setCancelledOrdersIdCode(cancelIdcode)
            })
    }

    const findOfferOrderCancel = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const cancelOffer = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Offer)')
                setCancelledOrdersOffer(cancelOffer)
            })
    }

    const findSubscOrderCancel = () => {
        getOrdersByAdminId(token, id)
            .then(response => {
                let data = response.data
                const cancelSubsc = data && data.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Subsc)')
                setCancelledOrdersSubsc(cancelSubsc)
                console.log(data, cancelSubsc)
            })
    }


    const changeActiveStatus = value => {
        updateUserActiveStatus(value)
            .catch(err => notify('Something wrong! please try again'))
    }

    const [disabledButton, setDisabledButton] = useState({
        disabled: false,
    });

    const { disabled } = disabledButton


    async function handleChange(selectedId) {
        productId["productList"] = selectedId
    }

    function handleSubmit() {
        setDisabledButton({
            disabled: true
        })
        productsId.push(productId)
        addProduct(token, productsId)
            .then(res => {
                setDisabledButton({
                    disabled: false
                })
                notify('Category added successfully')
            })
            .catch(err => {
                setDisabledButton({
                    disabled: false
                })
                notify('Something Failed! Please try again')
            })
    }

    const categotyDelete = (productId, categoryName) => {
        deleteProduct(productId)
            .then(res => notify('Categoty removed!'))
            .catch(err => notify('Something wrong!'))

        if (categoryName === '(InGame)') {
            setTimeout(() => { inGameTable = false }, 5000)
        }
        if (categoryName === '(IDCode)') {
            setTimeout(() => { idCodeTable = false }, 5000)
        }
        if (categoryName === '(Offer)') {
            setTimeout(() => { offerTable = false }, 5000)
        }
        if (categoryName === '(Subsc)') {
            setTimeout(() => { subscTable = false }, 5000)
        }

    }


    const searchOrder = (e) => {
        let searchTerm = e.target.value
        if (searchTerm === undefined) {
            search = false
        }
        else {
            search = true
        }
        getOrdersByAdminId(token, id)
            .then(res => {
                if (res.data) {
                    filterContent(res.data, searchTerm)
                }
            })
    }


    const filterContent = (orders, searchTerm) => {
        const result = orders.filter((item) =>
            item.userId?.email?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.userId?.username?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.userId?.phonenumber?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            ((parseInt(item.orderId)).toString()).includes(searchTerm) ||
            item.productId?.gameName?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.productId?.categoryName?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.purchaseId?.product?.option?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            ((parseInt(item.purchaseId?.product?.price)).toString()).includes(searchTerm) ||
            item.purchaseId?.accountType?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.purchaseId?.Number?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.purchaseId?.Password?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.purchaseId?.backupCode?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            item.purchaseId?.idCode?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            ((parseInt(item.userId?.userIdNo)).toString()).includes(searchTerm)
        )

        let value = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(InGame)')
        setInGameOrdersSearch(value)

        let value2 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(IDCode)')
        setIdCodeOrdersSearch(value2)

        let value3 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(InGame)')
        setCancelledOrdersInGame(value3)

        let value4 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(IDCode)')
        setCancelledOrdersIdCode(value4)

        let value5 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Offer)')
        setOfferOrdersSearch(value5)

        let value6 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === false && filteredData.productId?.categoryName === '(Subsc)')
        setSubscOrdersSearch(value6)

        let value7 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Offer)')
        setCancelledOrdersOffer(value7)

        let value8 = result && result.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(Subsc)')
        setCancelledOrdersSubsc(value8)
    }

    const makeActive = (id, user, game, category, product, price) => () => {
        orderId = id;
        orderUser = user;
        game_name = game;
        category_name = category;
        game_option = product;
        game_price = price;
        setDisabledButton({
            disabled: true
        })
        let data = {
            reject: false,
            rejectReason: null
        }
        updateOrderStatus(token, id, data)
            .then(res => {
                removeSpentAmount(token, orderUser, game_price, orderId)
                    .then(res => {
                        createNotifications(token, orderUser, `Your order has been reactive for ${game_name}. Purchase Package: ${game_option} ${game_price} Taka`)
                            .then(res => {
                                notify('Order reactive successfully!')
                                findInGameOrder()
                                findIdCodeOrder()
                                findOfferOrder()
                                findSubscOrder()
                                findInGameOrderCancel()
                                findIdCodeOrderCancel()
                                findOfferOrderCancel()
                                findSubscOrderCancel()
                                setTimeout(reloadPage, 3000)
                            })
                            .catch(res => {
                                notify('Something wrong! Please try again')
                                setDisabledButton({
                                    disabled: false
                                })
                                findInGameOrder()
                                findIdCodeOrder()
                                findOfferOrder()
                                findSubscOrder()
                                findInGameOrderCancel()
                                findIdCodeOrderCancel()
                                findOfferOrderCancel()
                                findSubscOrderCancel()
                            })
                    })

            })
            .catch(res => {
                notify('Something wrong! Please try again')
                setDisabledButton({
                    disabled: false
                })
            })
    }

    const markComplete = (id, notificationId, phonenumber, gameName, categoryName, option, spent, walletId) => () => {
        console.log(id, notificationId, phonenumber, gameName, categoryName, option, spent, walletId)
        setDisabledButton({
            disabled: true
        })
        let data = {
            isComplete: true,
            userId: notificationId,
            paymentComplete: true
        }
        let sms = `Your order from Sizishop has been confirmed for ${gameName}. Purchase Package: ${option} ${spent} Taka`
        let sendMessage = {
            number: phonenumber,
            message: sms.replaceAll(" ", "%20")
        }
        updateOrderStatus(token, id, data)
            .then(res => {
                const amount = 0
                notify('Order confirmed!')
                //sendMessageAPI(sendMessage)
                findInGameOrder()
                findIdCodeOrder()
                findOfferOrder()
                findSubscOrder()
                createNotifications(token, notificationId, `Your order has been confirmed for ${gameName}. Purchase Package: ${option} ${spent} Taka. `)
                    .then(res => {
                        setTimeout(reloadPage, 3000)
                    })

            })
            .catch(err => {
                setDisabledButton({
                    disabled: false
                })
                notify('Something Failed! Please try again')
            })

    }

    const modalOpen = (id, user, gameName, categoryName, option, price, complete) => () => {
        handleShow()
        orderId = id;
        orderUser = user;
        game_name = gameName;
        category_name = categoryName;
        game_option = option;
        game_price = price;
        paymentStatus = complete
    }

    const [note, setNote] = useState({
        noteText: '',
        disabled: false
    });

    const handleOnChange = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
        message = e.target.value
    }

    const createNote = () => {
        setDisabledButton({
            disabled: true
        })
        let data = {
            reject: true,
            message: `${message}`
        }
        updateOrderStatus(token, orderId, data)
            .then(res => {
                addSpentAmount(token, orderUser, game_price, orderId)
                    .then(res => {
                        createNotifications(token, orderUser, `Your order has been cancelled for ${game_name} ${category_name}. Purchase Package: ${game_option}(${game_price}). Reason: ${message}`)
                            .then(res => {
                                handleClose()
                                notify('Order cancelled')
                                findInGameOrder()
                                findIdCodeOrder()
                                findOfferOrder()
                                findSubscOrder()
                                findInGameOrderCancel()
                                findIdCodeOrderCancel()
                                findOfferOrderCancel()
                                findSubscOrderCancel()
                                setTimeout(reloadPage, 3000)
                            })
                            .catch(res => {
                                notify('Something wrong! Please try again')
                                findInGameOrder()
                                findIdCodeOrder()
                                findOfferOrder()
                                findSubscOrder()
                                findInGameOrderCancel()
                                findIdCodeOrderCancel()
                                findOfferOrderCancel()
                                findSubscOrderCancel()
                                setDisabledButton({
                                    disabled: false
                                })
                            })
                    })
                    .catch(res => {
                        notify('Something wrong! Please try again')
                        setDisabledButton({
                            disabled: false
                        })
                        findInGameOrder()
                        findIdCodeOrder()
                        findOfferOrder()
                        findSubscOrder()
                        findInGameOrderCancel()
                        findIdCodeOrderCancel()
                        findOfferOrderCancel()
                        findSubscOrderCancel()
                    })

            })
            .catch(res => {
                notify('Something wrong! Please try again')
                setDisabledButton({
                    disabled: false
                })
            })
    }

    const reloadPage = () => {
        setDisabledButton({
            disabled: false
        })
        window.location.reload(false)
    }


    return (
        <>

            <Alert variant="danger">
                Please turn off active status before leaving the admin panel
            </Alert>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ margin: "30px 10px" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Why do you want to cancel this order?</Form.Label>
                            <Form.Control type="text" name="noteText" placeholder="Add a short note" onChange={handleOnChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" disabled={disabled} onClick={createNote}>
                        Send
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>


            <Card title={`Hello ${adminData.username}`} extra={<p href="#">Pick A Category</p>} >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={e => handleChange(e)}
                >
                    {filteredProduct && filteredProduct.map((productData, index) => (
                        <Select.Option key={index} value={productData._id} name='productId' >
                            {productData.gameName}{productData.categoryName}
                        </Select.Option>
                    ))}

                </Select>

                <div className="pt-4 d-flex justify-content-center">
                    <Button type="primary" onClick={handleSubmit} disabled={disabled}>
                        Add Selected Items
                    </Button>
                </div>
                <div className="pt-4 text-center">
                    <div className='text-center'><Form.Label>Active Order Status</Form.Label></div>
                    <div><ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={adminData.activeStatus === radio.value}
                                onChange={(e) => changeActiveStatus(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup></div>
                </div>
            </Card>
            <br />

            <Card title={`Your Category`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th className="border-0">Your Category</th>
                            <th className="border-0" ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminData.productList && adminData.productList.map((productId, index) => {
                            if (product) {
                                for (var i = 0; i < product.length; i++) {
                                    if (product[i]._id === productId) {
                                        if (product[i].categoryName === '(InGame)') {
                                            inGameTable = true
                                        }
                                        if (product[i].categoryName === '(IDCode)') {
                                            idCodeTable = true
                                        }
                                        if (product[i].categoryName === '(Offer)') {
                                            offerTable = true
                                        }
                                        if (product[i].categoryName === '(Subsc)') {
                                            subscTable = true
                                        }
                                        return (
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{product[i].gameName} {product[i].categoryName}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <button variant="light" onClick={() => categotyDelete(productId, product[i].categoryName)} >
                                                            <AiOutlineDelete size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                }
                            }
                        })}
                    </tbody>
                </table>
            </Card>
            <br />

            <Row>
                <Col md="12">
                    <div style={{ float: "right", width: "300px", marginBottom: "10px" }}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="serachTerm"
                            onChange={searchOrder}
                        >
                        </input>
                    </div>
                </Col>
            </Row>


            {inGameTable && (
                <div>
                    <Card title={`InGame Orders`}>
                        <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Ingame orders: {totalIngame}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th className="border-0">Order ID</th>
                                    <th className="border-0">User ID</th>
                                    <th className="border-0">Product Name</th>
                                    <th className="border-0">Purchased Package</th>
                                    <th className="border-0">Account Name</th>
                                    <th className="border-0">Account Number</th>
                                    <th className="border-0">Account password</th>
                                    <th className="border-0">Backup Number</th>
                                    <th className="border-0">Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search === true && (<>
                                    <Tablessss inGameOrders={currentPostSearch} loading={loading} paginate={currentPage} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                                </>)}
                                {search === false && (<>
                                    <Tablessss inGameOrders={currentPost} loading={loading} paginate={currentPage} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                                </>)}

                            </tbody>
                        </table>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={inGameOrders.length}
                            paginate={paginate}
                        />
                    </Card>
                    <br />
                </div>
            )}

            {idCodeTable && (
                <div>
                    <Card title={`IdCode Orders`}>
                        <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Idcode orders: {totalIdcode}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th className="border-0">Order ID</th>
                                    <th className="border-0">User ID</th>
                                    <th className="border-0">Product Name</th>
                                    <th className="border-0">Purchased Package</th>
                                    <th className="border-0">Id Code</th>
                                    <th className="border-0">Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search === true && (<>
                                    <Tables idCodeOrders={currentPostsSearch} loading={loading} paginates={currentPages} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                                </>)}
                                {search === false && (<>
                                    <Tables idCodeOrders={currentPosts} loading={loading} paginates={currentPages} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                                </>)}
                            </tbody>
                        </table>
                        <Pagination
                            postsPerPage={postsPerPages}
                            totalPosts={idCodeOrders.length}
                            paginate={paginates}
                        />
                    </Card>
                    <br />
                </div>
            )}

            {offerTable && (<div>
                <Card title={`Offer Orders`}>
                    <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Offer orders: {totalOffer}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th className="border-0">Order ID</th>
                                <th className="border-0">User ID</th>
                                <th className="border-0">Product Name</th>
                                <th className="border-0">Purchased Package</th>
                                <th className="border-0">Account Name</th>
                                <th className="border-0">Account Number</th>
                                <th className="border-0">Account password</th>
                                <th className="border-0">Backup Number</th>
                                <th className="border-0">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search === true && (<>
                                <Tablesssss offerOrders={currentPostssSearch} loading={loading} paginatessss={currentPagessss} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                            </>)}
                            {search === false && (<>
                                <Tablesssss offerOrders={currentPostssss} loading={loading} paginatessss={currentPagessss} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                            </>)}

                        </tbody>
                    </table>
                    <Pagination
                        postsPerPage={postsPerPagessss}
                        totalPosts={offerOrders.length}
                        paginate={paginatessss}
                    />
                </Card>
                <br />
            </div>)}

            {subscTable && (<div>
                <Card title={`Subsc Orders`}>
                    <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Subsc orders: {totalSubsc}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th className="border-0">Order ID</th>
                                <th className="border-0">User ID</th>
                                <th className="border-0">Product Name</th>
                                <th className="border-0">Purchased Package</th>
                                <th className="border-0">Account Name</th>
                                <th className="border-0">Account Number</th>
                                <th className="border-0">Account password</th>
                                <th className="border-0">Backup Number</th>
                                <th className="border-0">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search === true && (<>
                                <Tablessssss subscOrders={currentPostsssSearch} loading={loading} paginatesssss={currentPagesssss} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                            </>)}
                            {search === false && (<>
                                <Tablessssss subscOrders={currentPostsssss} loading={loading} paginatesssss={currentPagesssss} markComplete={markComplete} modalOpen={modalOpen} disabled={disabled} />
                            </>)}

                        </tbody>
                    </table>
                    <Pagination
                        postsPerPage={postsPerPagesssss}
                        totalPosts={subscOrders.length}
                        paginate={paginatesssss}
                    />
                </Card>
                <br />
            </div>)}

            {inGameTable && (
                <div>
                    <Card title={`Cancelled Orders (InGame)`}>
                        <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Cancel Ingame orders: {totalIngameCancel}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th className="border-0">Order ID</th>
                                    <th className="border-0">User ID</th>
                                    <th className="border-0">Product Name</th>
                                    <th className="border-0">Purchased Package</th>
                                    <th className="border-0">Account Name</th>
                                    <th className="border-0">Account Number</th>
                                    <th className="border-0">Account password</th>
                                    <th className="border-0">Backup Number</th>
                                    <th className="border-0">Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Tabless cancelledOrdersInGame={currentPostss} loading={loading} paginatess={currentPagess} makeActive={makeActive} disabled={disabled} />
                            </tbody>
                        </table>
                        <Pagination
                            postsPerPage={postsPerPagess}
                            totalPosts={cancelledOrdersInGame.length}
                            paginate={paginatess}
                        />
                    </Card>
                    <br />
                </div>
            )}

            {idCodeTable && (
                <div>
                    <Card title={`Cancelled Orders (IdCode)`}>
                        <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Cancel Idcode orders: {totalIdcodeCancel}</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th className="border-0">Order ID</th>
                                    <th className="border-0">User ID</th>
                                    <th className="border-0">Product Name</th>
                                    <th className="border-0">Purchased Package</th>
                                    <th className="border-0">Id Code</th>
                                    <th className="border-0">Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Tablesss cancelledOrdersIdCode={currentPostsss} loading={loading} paginatesss={currentPagesss} makeActive={makeActive} disabled={disabled} />
                            </tbody>
                        </table>
                        <Pagination
                            postsPerPage={postsPerPagesss}
                            totalPosts={cancelledOrdersIdCode.length}
                            paginate={paginatesss}
                        />
                    </Card>
                </div>
            )}

            {offerTable && (<div>
                <Card title={`Cancelled Orders (Offer)`}>
                    <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Cancel Offer orders: {totalOfferCancel}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th className="border-0">Order ID</th>
                                <th className="border-0">User ID</th>
                                <th className="border-0">Product Name</th>
                                <th className="border-0">Purchased Package</th>
                                <th className="border-0">Account Name</th>
                                <th className="border-0">Account Number</th>
                                <th className="border-0">Account password</th>
                                <th className="border-0">Backup Number</th>
                                <th className="border-0">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Tablesssssss cancelledOrdersOffer={currentPostssssss} loading={loading} paginatessssss={currentPagessssss} makeActive={makeActive} disabled={disabled} />
                        </tbody>
                    </table>
                    <Pagination
                        postsPerPage={postsPerPagessssss}
                        totalPosts={cancelledOrdersOffer.length}
                        paginate={paginatessssss}
                    />
                </Card>
                <br />
            </div>)}

            {subscTable && (<div>
                <Card title={`Cancelled Orders (Subsc)`}>
                    <p style={{ fontSize: ".9rem", marginBottom: "20px" }} className="text-muted">Total Cancel Subs orders: {totalSubscCancel}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th className="border-0">Order ID</th>
                                <th className="border-0">User ID</th>
                                <th className="border-0">Product Name</th>
                                <th className="border-0">Purchased Package</th>
                                <th className="border-0">Account Name</th>
                                <th className="border-0">Account Number</th>
                                <th className="border-0">Account password</th>
                                <th className="border-0">Backup Number</th>
                                <th className="border-0">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Tablessssssss cancelledOrdersSubsc={currentPostsssssss} loading={loading} paginatesssssss={currentPagesssssss} makeActive={makeActive} disabled={disabled} />
                        </tbody>
                    </table>
                    <Pagination
                        postsPerPage={postsPerPagesssssss}
                        totalPosts={cancelledOrdersSubsc.length}
                        paginate={paginatesssssss}
                    />
                </Card>
                <br />
            </div>)}

        </>
    )
}
export default OrderHandle