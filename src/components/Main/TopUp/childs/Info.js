import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Card, Col, Form, Row, Button, Badge} from "react-bootstrap";
import "./gameinfo.css"
import styled from 'styled-components';
import {isAuthenticated} from '../../../../utils/auth';
import {getOneUser} from '../../../../Api/user';
import {userInfo} from '../../../../utils/auth';
import NotificationModal from './NotificationModal';
import {updateWallet, getWalletById} from '../../../../Api/wallet';
import {createNewPurchase} from '../../../../Api/purchase';
import {createNewOrder} from '../../../../Api/order';
import {notify} from '../../../../utils/notification'
import {getOneProduct} from "../../../../Api/products";
import Logo2 from "../../../../assets/img/logo.png";
import {createNotifications} from '../../../../Api/notification'
import {useHistory} from "react-router-dom";
import moment from "moment";
import {Box} from "@mui/material";

let activeIdCode = false;
let activeError = false;

const Buttons = styled.button`
  background-color: #299078;
  color: whitesmoke;
  font-size: 15px;
  padding: 5px 40px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  width: 290px;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 882px) {
    padding: 5px 20px;
    margin-top: 2px;
    width: 150px;
    font-size: 13px;
  }
  @media screen and (max-width: 640px) {
    padding: 5px 20px;
    margin-top: 2px;
    width: 120px;
    font-size: 10px;
  }
  &:disabled {
    color: #299078;
    background-color: white;
    opacity: 1;
    cursor: default;
  }
`;

const Buttonss = styled.button`
  opacity: 50%;
  color: #299078;
  background-color: white;
  border: 1px solid #299078;
  font-size: 15px;
  padding: 5px 40px;
  border-radius: 5px;
  cursor: default;
  margin: 5px;
  width: 290px;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 882px) {
    padding: 5px 20px;
    margin-top: 2px;
    width: 150px;
    font-size: 13px;
  }
  @media screen and (max-width: 640px) {
    padding: 5px 20px;
    margin-top: 2px;
    width: 120px;
    font-size: 10px;
  }
  &:disabled {
    color: #299078;
    background-color: white;
    opacity: 1;
    cursor: default;
  }
`;

const ButtonToggle = styled(Buttons)`
  color: #299078;
  background-color: white;
  border: 1px solid #299078;
  ${({active}) =>
          active &&
          `
    color: white;
    background-color: #299078;
    
  `}
`;


const account = [
    {
        type: "Facebook"
    },
    {
        type: "Google"
    }
]


const GameInfo = (props) => {
    const [accountSelect, setAccountType] = useState({
            accountType: ''
        }
    )


    let history = useHistory();


    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})
    const [user, setUser] = useState({})
    const [topUp, setTopUP] = useState([])
    const [active, setActive] = useState(topUp[0]);
    const idData = useParams()
    const sid = idData.id
    const productId = idData.productId
    const {accountName} = account
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [isWallet, setIsWallet] = useState(false);
    const [walletId, setWalletId] = useState('');
    const [balance, setBalance] = useState({});
    const [recharge, setRecharge] = useState(0);
    const [caategoryType, setcategoryType] = useState({})
    const [productInfo, setProductInfo] = useState({})

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const [buttonDisabled, setButtonDisabled] = useState({
        disabled: false
    })

    const {disabled} = buttonDisabled;

    function handleOption(e) {
        setAccountType({
            ...accountSelect,
            [e.target.name]: e.target.value,
        })
    }


    function func2(option, price) {
        setValues({
            ...values,
            product: {
                [option]: price
            },
        })
    }


    function addBalance() {
        history.push({
            pathname: '/confirmation',
        });
    }

    const stockFilter = (data) => {
        if (data) {
            return (<>In Stock</>)
        } else {
            return (<div style={{color: '#d11141' }}>Stock Out</div>)
        }
    }
    useEffect(() => {
        activeIdCode = false;
        getOneProduct(productId)
            .then((res) => {
                let allData = res.data.categoryName
                setcategoryType(allData)
                setProductInfo(res)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        if (isAuthenticated()) {
            const {token, id} = userInfo();
            getOneUser(id)
                .then(response => {
                    setUser(response.data), setWalletId(response.data.wallet)
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }

    }, [user]);

    useEffect(() => {
        if (isAuthenticated()) {
            const {token} = userInfo();
            getWalletById(token, walletId)
                .then(response => setBalance(response.data))
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [walletId]);


    useEffect(() => {
        getOneProduct(idData.productId)
            .then((res) => {
                setTopUP(res.data.topUp)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);


    const [values, setValues] = useState({
        productId: productId,
        accountType: '',
        Number: '',
        Password: '',
        backupCode: '',
        idCode: '',
        product: {}
    });

    let {accountType, Number, Password, backupCode, product, idCode} = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {

        if (Object.keys(values.product).length === 0) {
            activeError = true
        } else {
            values.idCodeActive = activeIdCode

            setButtonDisabled({
                disabled: true
            })
            if (!isAuthenticated()) {

                history.push({
                    pathname: '/login',
                });
                //test.bdsell.net

                history.push({pathname: '/login'});
            }
            if (user && user.wallet === null) {
                handleShow()
                setMsg('Do You want to create your wallet?')

            }

            let amount = 0
            for (let x in product) {
                amount = product[x]
            }
            let spent = amount

            if (user && user.wallet != null) {
                if (balance.currentAmount < amount) {
                    const due = amount - balance.currentAmount
                    setIsWallet(true)
                    setButtonDisabled({
                        disabled: false
                    })
                    setMsg(`You Need ${due} taka more to purchase the product. Do you want to recharge?`)
                    handleShow()
                } else {
                    const {token, id,} = userInfo();
                    createNewPurchase(token, values)
                        .then(response => {
                            const data = {
                                userId: id,
                                purchaseId: response.data.purchase._id,
                                productId: response.data.purchase.productId,
                                walletId: user.wallet,
                                paymentComplete: true
                            }
                            createNewOrder(token, data)
                                .then(response => {
                                    const amount = 0
                                    updateWallet(token, user.wallet, amount, spent)
                                        .then(res => {
                                            notify('Order Created. Please wait for admin approval')
                                            createNotifications(token, id, `You have placed an order on ${productInfo.data.gameName}. Purchase Package: ${(Object.keys(values.product))[0]} ${((Object.values(values.product))[0])} Taka. Order Date:  ${moment().format('MMMM Do YYYY, h:mm a')}. Please wait for admin approval`).then(r =>history.push('/myOrder') )
                                            history.push('/myOrder')
                                        })
                                })
                                .catch(err => {
                                    setButtonDisabled({
                                        disabled: false
                                    })
                                    notify('Something Failed! Please try again')
                                })
                        })
                        .catch(err => {
                            let errMsg = "Something went wrong!";
                            if (err.response) errMsg = err.response.data;
                            notify(errMsg)
                            setButtonDisabled({
                                disabled: false
                            })
                        })
                }
            }

        }
    }


    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    const accountTypeExist = () => {
        if (accountType) {
            return (
                <>
                    <Form.Label>Backup Code</Form.Label>
                    <Form.Control placeholder="Backup Code" name="backupCode" value={backupCode}
                                  onChange={handleChange}/>
                    <div className="p-1 d-flex justify-content-lg-end"><a style={{color: 'red'}}
                                                                          href={productInfo.data?.backUpLink}
                                                                          target="_blank" rel="noopener noreferrer">How
                        To Get Backup Code</a></div>
                </>
            );
        }
    }

    function accountTypeChange() {
        if (caategoryType === "(IDCode)") {
            activeIdCode = true
            return (
                <Card className="mb-4">
                    <Card.Body>
                        <div><label className="block text-gray-700">Enter Player ID</label>
                            <input onKeyUp="value=isNaN(parseFloat(value))||value<0||value>9000?1000:value"
                                   type="number" name="idCode" placeholder="Enter Player ID"
                                   value={idCode}
                                   required onChange={handleChange} autoFocus="autofocus"
                                   autoComplete={true}
                                   className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none"/>
                        </div>
                    </Card.Body>
                </Card>
            )
        } else {
            return (
                <Card className="mb-4">
                    <Card.Body>
                        <Row>
                            <Col xs={12} sm={12} md={4} xl={4}>
                                <Form.Label>Account Type</Form.Label>
                                <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                                              value={accountType} name="accountType" onChange={handleChange}>
                                    <option>Select an account type</option>
                                    {
                                        account.map((data, index) => {
                                                return (
                                                    <option key={index}>{data.type}</option>
                                                )
                                            }
                                        )
                                    }
                                </Form.Control>
                            </Col>
                            <Col xs={12} sm={12} md={4} xl={4}>
                                <Form.Label>{accountType} Account

                                </Form.Label>
                                <Form.Control placeholder={`${accountType} account`} name="Number" value={Number}
                                              onChange={e => {
                                                  handleChange(e);
                                                  setField('name', e.target.value)
                                              }} required/>
                            </Col>
                            <Col xs={12} sm={12} md={4} xl={4}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="Password" name="Password" value={Password}
                                              onChange={handleChange}/>
                            </Col>
                        </Row>
                        {accountTypeExist()}
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <>
            <NotificationModal show={show} msg={msg} handleClose={handleClose} addBalance={addBalance}/>
            <div as={Form}>
                {accountTypeChange()}
                <Card className="mb-4">
                    <Card.Body>
                        <Form.Label>Select Recharge</Form.Label>


                        <div style={{display: "flex", flexWrap: "wrap", textAlign: "center", justifyContent: "center"}}>
                            {topUp && topUp.map ((product)=> {
                                return(
                                    <div  key={product._id}>
                                        {product.stock && (
                                            <ButtonToggle
                                                          active={active === product._id}
                                                          onClick={function (event) {
                                                              setActive(product._id);
                                                              func2(product.option, product.price)
                                                          }}
                                                          variant="outline-primary">

                                                <div className='d-flex justify-content-center font-bold text-center'>
                                                    <div>
                                                        {product.option}
                                                    </div>
                                                    <Badge className=" ml-2"><Box sx={{color : "#ffa700" }}>BDT{product.price}</Box></Badge>
                                                    <Badge bg="secondary">
                                                        {stockFilter(product.stock)}
                                                    </Badge>
                                                </div>

                                            </ButtonToggle>
                                        )}
                                        {
                                            !product.stock && (
                                                <Buttonss disable
                                                    variant="outline-primary">
                                                    <div className='d-flex justify-content-center font-bold text-center'>
                                                        <div>
                                                            {product.option}
                                                        </div>
                                                        <Badge className=" ml-2"><Box sx={{color : "#ffa700" }}>BDT{product.price}</Box></Badge>
                                                        <Badge bg="secondary">
                                                            {stockFilter(product.stock)}
                                                        </Badge>
                                                    </div>

                                                </Buttonss>
                                            )
                                        }
                                    </div>
                                )
                            })}

                        </div>

                        {activeError === true && (<>
                            <p style={{color: "red", marginLeft: "5px"}}>Please select a package</p>
                        </>)}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Form.Label>Select Wallet</Form.Label>
                        <div className="d-flex justify-content-center " >
                            <Card>
                                <Card.Body style={{backgroundColor : '#fff', color: 'white', border: '1px solid #299078'}}>
                                    <img width='95px' src={Logo2} alt="sizishop"/>
                                    PipoBazar Wallet
                                </Card.Body>
                            </Card>
                        </div>
                    </Card.Body>
                </Card>
                <div className='d-flex justify-content-end'>
                    <Button style={{backgroundColor: '#299078', borderColor: '#299078' }} data={values} disabled={disabled} className="d-flex justify-content-center"
                            onClick={handleSubmit}>Submit</Button>
                </div>
                <br/>
            </div>
        </>
    )
}
export default GameInfo