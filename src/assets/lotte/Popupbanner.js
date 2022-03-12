import React, { useState, useEffect } from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {userInfo} from "../../../utils/auth";
import {addPaymentMethod, findAllPaymentMethod} from "../../../Api/paymentMethod";
import { notify } from '../../../utils/notification'
import {addPopUpBanner, findPopUpBanner, updatePopBanner} from "../../../Api/poupbanner";
import {API} from "../../../utils/config";

const PaymentMethod = () => {
    const [addMethod, setAddMethod] = useState({
        formData: '',
    });
const [getImage, SetGetImage] = useState({
    image:''
})
    let id = getImage._id
    const [values, setValues] = useState({
        success: false,
        alert: false
    })
    const { success, alert } = values;
    const { formData } = addMethod

    useEffect(() => {
        setAddMethod({
            ...addMethod,
            formData: new FormData()
        })
    }, [])

    useEffect(() => {
        findPopUpBanner()
            .then((res) => {
            let allData = res.data
            SetGetImage(allData)
            console.log(allData)
        })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);


    console.log(getImage)

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAddMethod({
            ...addMethod,
            [e.target.name]: value,
        })
    }



    const handleSubmit = e => {
        e.preventDefault();
        setAddMethod({
            ...addMethod
        })
        const { token } = userInfo();
        updatePopBanner(id, formData)
            .then(response => {
                setAddMethod({
                    success: true,
                })
                notify("Payment Method Added Successfully!")
                // setTimeout(reloadPage, 5000)
            })
            .catch(err => {
                notify("Something wrong!")
                // setTimeout(reloadPage, 5000)
            })
    }

    // const reloadPage = () => {
    //     window.location.reload(false)
    // }

console.log(addMethod)
    const addForm = () => (
        <>
            <div>
                <Card>
                    <Card.Body>
                        <Card.Header>Add Payment Method</Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Default file input example</Form.Label>
                                        <Form.Control type="file" name="image" onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                                        <Col>
                                            <img width="20%" src={`${API}${getImage.image}`} alt="banner"/>
                                        </Col>
                            </Row>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )

    return (
        <div>
            {addForm()}
        </div>
    )
}

export default PaymentMethod;