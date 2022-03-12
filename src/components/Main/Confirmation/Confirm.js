import React, { Fragment, useState, useEffect } from "react";
import { Badge, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import { addWallet } from '../../../Api/addWallet';
import { userInfo } from '../../../utils/auth';
import { getOneUser } from '../../../Api/user';
import { createNewPurchase } from '../../../Api/purchase';
import { Modal } from "react-bootstrap";
import { notify } from '../../../utils/notification'
import Footer from "../Footer";
import NavBar from "../Navbar/Navbar";
import "./conformation.css"
import { CgEditBlackPoint } from "react-icons/cg"
import { createNewOrder, orderQueue } from '../../../Api/order';
import { createWallet } from '../../../Api/wallet';
import { findAllPaymentMethod } from "../../../Api/paymentMethod";
import { API } from "../../../utils/config";
import { createNotifications } from '../../../Api/notification'
import { getOneProduct } from "../../../Api/products";
import { useHistory } from "react-router-dom";
let productPackage, productPrice, paymentNumber, paymentOption;


const moneySendWay = [
  {
    "how": "টাকা যোগ করবেন কীভাবে?",
    "condition": "(যেকোন পার্সোনাল বিকাশ একাউন্ট হতে হবে)",
    "Step1": [
      {
        "point": "প্রথমে উপরে দেওয়া নাম্বার কপি করুণ।"
      },
      {
        "point": "(bKash,Nagad,Rocket, upay) App অথাবা Ussd কোডের মধ্যেমে"
      },
      {
        "point": "সেন্ড মানি অপশন সিলেক্ট করুণ।"
      },
      {
        "point": "Cizishop WALLET নাম্বার (_) প্রবেশ করুণ।"
      },
      {
        "point": "এম্যাউন্ট অর্থাৎ কত টাকা যোগ করবেন তার পরিমাণ প্রবেশ করুণ।"
      },
      {
        "point": "রেফারেন্সে আপনার সেলফটেন ইউজার আইডি প্রবেশ করুণ।"
      },
      {
        "point": "আপনার বিকাশ পিন নাম্বার প্রবেশ করুণ।"
      },
    ],
    "Step2": [
      {
        "point": "পনিচে যে দুটি বক্স দেখতে পারছেন প্রথম Box এ কত টাকা পাঠিয়েছেন সেটা লিখুন।"
      },
      {
        "point": "দ্বিতীয় বক্সে আপনি যে নাম্বার থেকে টাকা পাঠিয়েছেন সেই নাম্বারটি লিখুন।"
      },
      {
        "point": "তারপর Submit অপশনে ক্লিক করুণ।"
      },
      {
        "point": "পাঁচ থেকে দশ মিনিটের মধ্যে টাকা যোগ হয়ে যাবে আপনার সেলফটেন ওয়ালেটে।"
      },
      {
        "point": "এম্যাউন্ট অর্থাৎ কত টাকা যোগ করবেন তার পরিমাণ প্রবেশ করুণ।"
      },
      {
        "point": "অবশ্যই টাকা Send Money করার পর এই কাজটি করবেন।"
      },
    ]
  }
]


const Button = styled.button`
  background-color: #299078 ;
  color: whitesmoke;
  font-size: 15px;
  padding: 5px 40px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  object-fit: contain;
  &:disabled {
    color: #299078;
    background-color: white;
    opacity: 1;
    cursor: default;
  }
`;

const ButtonToggle = styled(Button)`
  color: #299078;
  background-color: white;
  border: 1px solid #299078;
  ${({ active }) =>
    active &&
    `
    color: white;
    background-color: #299078;
    
  `}
`;


const Confirm = () => {
  let history = useHistory();
  const [productInfo, setProductInfo] = useState({})
  const [paymentMethod, setPaymentMethod] = useState([{
    name: '',
    number: '',
    image: ''
  }])
  const [user, setUser] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    walletId: '',
    paymentType: '',
    transactionID: '',
    mobileNumber: '',
    amount: '',
  });

  const [rechargeId, setRechargeId] = useState({
    rechargeId: '',
  });


  const { paymentType, transactionID, mobileNumber, amount } = values;

  const [disabledButton, setDisabledButton] = useState({
    disabled: false,
  });

  const { disabled } = disabledButton

  useEffect(() => {
    getOneUser(id)
      .then(response => setUser(response.data))
      .catch((err) => {
        console.log(err.response);
      });
  }, [values]);



  useEffect(() => {
    findAllPaymentMethod()
      .then((res) => {
        let allData = res.data
        setPaymentMethod(allData)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('values'))
    if (data) {
      getOneProduct(data.productId)
        .then(res => setProductInfo(res.data))
    }
  }, []);


  const [confirmation, setConfirmation] = useState({});

  const [active, setActive] = useState({});
  const { token, id } = userInfo();

  function func2(paymentType) {
    setValues({
      ...values,
      paymentType: paymentType
    })
  }

  function handleClick(e) {
    setActive({
      ...payMethod,
      [e.target.name]: e.target.value,

    })
  }

  function createOrder() {
    handleClose()
    const data = JSON.parse(localStorage.getItem('values'))
    productPackage = (Object.keys(data.product))[0]
    productPrice = (Object.values(data.product))[0]
    createNewPurchase(token, data)
      .then(response => {
        const data = {
          userId: id,
          purchaseId: response.data.purchase._id,
          productId: response.data.purchase.productId,
          walletId: values.walletId,
          rechargeId: rechargeId.rechargeId
        }
        createNewOrder(token, data)
          .then(response => {
            notify('Order Created. Please wait for admin approval')
            //orderQueue()
            createNotifications(token, id, `You have placed an order on ${productInfo.gameName}. Purchase Package: ${productPackage} ${productPrice} Taka. Please wait for admin approval`)
            localStorage.removeItem('values');
          })
          .catch(err => notify('Something Failed! Please try again'))
      })
      .catch(err => {
        let errMsg = "Something went wrong!";
        if (err.response) errMsg = err.response.data;
        notify(errMsg)
      })
  }

  function addRecharge(rechargeId) {
    setRechargeId({
      rechargeId: rechargeId
    })
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      walletId: user.wallet,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentNumber === values.mobileNumber) {
      notify(`Please Enter your ${paymentOption} account number.`)
    }
    else {
      setDisabledButton({ disabled: true });
      addWallet(token, values)
        .then(response => {
          setDisabledButton({ disabled: false });
          notify('Add Amount Successfully. Please wait for verification')
          createNotifications(token, id, `You have recharge ${values.amount} Taka (TransactionId: ${values.transactionID}).Your transaction is being processed. Please wait for admin varification.`)
          history.push('/userWallet')
        })
        .catch(err => {
          setDisabledButton({ disabled: false });
          let errMsg = "Something went wrong!";
          if (err.response) errMsg = err.response.data;
          notify(errMsg)
        })
    }

  }



  function paymentTypeNumber(paymentType) {
    paymentOption=paymentType
    for (let i = 0; i < paymentMethod.length; i++) {
      if (paymentType === paymentMethod[i].name) {
        paymentNumber = paymentMethod[i].number

        return (
          <>
            ({paymentMethod[i].number}) <i className="fa fa-copy" onClick={copyNumber(paymentMethod[i].number)} style={{ fontSize: ".8rem", color: "grey", cursor: "pointer" }}></i>
          </>
        )
      }
    }
  }


  const copyNumber = (number) =>()=> {
    navigator.clipboard.writeText(number);
    notify('Number copied!')
  }

  return (

    <>
      <NavBar />
      <Container className="content-width">
        <Row className="d-flex justify-content-center" >
          {paymentMethod && paymentMethod.map((data, index) => {
            return (
              <Col key={index} sm={6} xs={6} xl={3}>
                <ButtonToggle
                  active={active === data._id}
                  onClick={() => setActive(data._id)}
                  onClick={function (event) {
                    setActive(data._id);
                    func2(data.name)
                  }}
                  variant="outline-primary" name="paymentType" value={paymentType}><img
                    className="object" src={`${API}${data.image}`} alt={data.name} />
                  <div
                    bg="primary" name="paymentType" value={paymentType}>{data.name}</div>
                </ButtonToggle>
              </Col>
            )
          })}
        </Row>


        <div>
          {moneySendWay.map((data, index) => {
            return (
              <Fragment key={index}>

                <div className="">

                  <div>
                    <div className="m-2">
                      <div className='d-flex text-edit'>
                        <div className='mr-2'> {paymentType}</div>
                        <div>
                          {paymentTypeNumber(paymentType)}
                        </div>

                      </div>

                      <div className="font-bold">{data.how}</div>
                    </div>
                    <div className="mb-2 text-muted">{data.condition}</div>
                    Step 1
                    {data.Step1.map((allData, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="m-2 d-flex">
                            <div className="mt-1 mr-2 colors">
                              <CgEditBlackPoint />
                            </div>
                            <div>
                              {allData.point}
                            </div>
                          </div>
                        </Fragment>
                      )
                    })}
                    Step 2
                    {data.Step2.map((allData, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="m-2  d-flex">
                            <div className="mt-1 mr-2 colors" >
                              <CgEditBlackPoint />
                            </div>
                            <div>
                              {allData.point}
                            </div>
                          </div>
                          {/*<div className="m-2">*/}
                          {/*    {index + 1} .{allData.point}*/}
                          {/*</div>*/}
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              </Fragment>
            )
          })}
        </div>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="amount" name="amount" value={amount} placeholder="Enter Amount"
                onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Sender Number</Form.Label>
              <Form.Control type="seders_number" name="mobileNumber" value={mobileNumber}
                placeholder="Sender Number" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Transaction Number</Form.Label>
              <Form.Control type="transactionNumber" name="transactionID" value={transactionID}
                placeholder="Transaction Number" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={disabled} onClick={handleSubmit} style={{ backgroundColor: "#299078" }}>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Confirm