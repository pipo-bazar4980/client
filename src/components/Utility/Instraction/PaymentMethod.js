import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { userInfo } from "../../../utils/auth";
import { addPaymentMethod } from "../../../Api/paymentMethod";
import { notify } from '../../../utils/notification'

const PaymentMethod = () => {
    const [addMethod, setAddMethod] = useState({
        name: '',
        number: '',
        formData: '',
    });

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled:false
    })

    const { success, alert,disabled } = values;
    const { name, number, formData } = addMethod


    useEffect(() => {
        setAddMethod({
            ...addMethod,
            formData: new FormData()
        })
    }, [])


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
        setValues({
            ...values,
            disabled:true
        })
        setAddMethod({
            ...addMethod
        })
        const { token } = userInfo();
        addPaymentMethod(token, formData)
            .then(response => {
                setAddMethod({
                    name: '',
                    number: '',
                    success: true,
                })
                notify("Payment Method Added Successfully!")
                setValues({
                    ...values,
                    disabled:false
                })
                setTimeout(reloadPage, 2000)
            })
            .catch(err => {
                let errMsg = "Something went wrong!";
                if (err.response) errMsg = err.response.data;
                notify(`${errMsg}`)
                setValues({
                    ...values,
                    disabled:false
                })
                setTimeout(reloadPage, 2000)
            })
    }

    const reloadPage = () => {
        window.location.reload(false)
    }

    const addForm = () => (
        <>
            <div>
                <Card>
                    <Card.Body>
                        <Card.Header>Add Payment Method</Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Payment Method Name</Form.Label>
                                        <Form.Control type="name" placeholder="Payment Method Name" name='name' value={name} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Number</Form.Label>
                                        <Form.Control type="name" placeholder="Number" name='number' value={number} onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Default file input example</Form.Label>
                                        <Form.Control type="file" name="image" onChange={handleChange} />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Button variant="primary" type="submit" disabled={disabled}>
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