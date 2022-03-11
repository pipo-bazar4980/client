import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Col, Modal, Row} from "react-bootstrap";
import "./gameinfo.css"
import {API} from '../../../../utils/config';
import {getOneProduct} from "../../../../Api/products";
import {Rate} from 'antd';
import {addRatings, getAllRating, getOneRating, updateRating} from "../../../../Api/rating";
import {isAuthenticated, userInfo} from "../../../../utils/auth";
import { useHistory} from "react-router-dom";
import {notify} from "../../../../utils/notification";
let name;
const GameProdInfo = () => {
    const heardData = useParams()
    const sid = heardData.productId
    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProduct] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [rate, setRate] = useState(0)
    const [currentRating, setCurrentRating] = useState()
    const [rateId, setRateId] = useState(0)

    useEffect(() => {
        // activeIdCode = false;
        getOneProduct(sid)
            .then((res) => {
                name=res.data.gameName
                const allData = res.data
                let detailsData = allData.details[0]
                setProduct(allData);
                
                setProductDetails(detailsData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(()=> {
        if (isAuthenticated()){
            const { token, id } = userInfo();
            getOneRating(token, sid, id).then(r => {
                console.log(r.data)
                if (r.data[0]){
                    setRate(r.data[0].rating*1.0)
                    setRateId(r.data[0]._id)
                    console.log("r",rateId)
                }
                //
            })
        }

    },[])
    useEffect(()=> {
        getAllRating(sid).then(r =>  setCurrentRating(r.data.ratings))
    },[])

    function handleSubmit(e) {
        if (isAuthenticated()){
            const { token, id } = userInfo();
            const ratings = {
                rating : e,
                userId : id,
                productId : product._id
            }
            console.log("rateId", rate)
            if (rate!==0){
                updateRating(token, rateId, ratings).then(r => {
                    // console.log(rateId)
                    notify('Rating Updated')
                })
            }else{
                addRatings(token, id, ratings).then(r => {
                    // console.log(r)
                    notify('Rating Added')
                })
            }


        } else {
            handleShow()
        }

    }

    console.log("p",product)

    const handleChange = (e) => {
        console.log(e)
        setRate(e)
        handleSubmit(e)
    }

    function handleCloseToLogin() {
        history.push({
            pathname: '/login',
        });
    }

    function ratingpresent() {
        if (rate) {
            console.log(rate)
            return(
                <Rate name="rating"  allowHalf value={rate} onChange={handleChange}/>
            )
        }
        else {
            return (
                <Rate name="rating"  allowHalf  onChange={handleChange}/>
            )
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>You need to log in to submit ratings</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseToLogin}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col>
                    <div> Name :  {name}</div>

                </Col>
                {/*<Col xs={5} sm={6} md={2} xl={2} className="image_prop">*/}
                {/*    <div className='text-center image_prop2'>*/}
                {/*        <img className='text-center image_prop2' src={`${API}${product.images}`} alt="card image"/>*/}
                {/*    </div>*/}


                {/*</Col>*/}
                {/*<Col xs={7} sm={6} md={10} lg={10} xl={10} className="info_prop justify-content-center">*/}
                {/*    <div className="info_prop" >*/}
                {/*        <div>*/}
                {/*            Name: {product.gameName} {product.categoryName}*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            Region :*/}
                {/*            {productDetails.region}*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            Platform :*/}
                {/*            {productDetails.platform}*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            Publisher :*/}
                {/*            {productDetails.publisher}*/}
                {/*        </div>*/}
                {/*        <div >*/}
                {/*            <div className="mt-4 ">*/}
                {/*                Current Rating*/}
                {/*            </div>*/}
                {/*            <div >*/}
                {/*                <Rate autoFocus allowHalf value={currentRating}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                Rate This Product*/}
                {/*            </div>*/}
                {/*            <div className="text-white" >*/}
                {/*                {ratingpresent()}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Col>*/}
            </Row>

        </>
    )
}
export default GameProdInfo