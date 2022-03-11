import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Col, Form, Row, ToggleButton } from "react-bootstrap";
import { userInfo } from "../../../utils/auth";
import { notify } from '../../../utils/notification'
import { findPopUpBanner, updatePopBanner } from "../../../Api/poupbanner";
import { API } from "../../../utils/config";
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Dhaka');

const radios = [
    { name: 'InActive', value: 'inActive' },
    { name: 'Active', value: 'active' },
];
const PaymentMethod = () => {
    const [addMethod, setAddMethod] = useState({
        text: '',
        link: '',
        formData: '',
    });

    const [getImage, SetGetImage] = useState({
        image: ''
    })

    let id = getImage._id

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled: false,
    })

    const { success, alert, disabled } = values;
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
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [getImage]);


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
            disabled: true
        })
        setAddMethod({
            ...addMethod
        })
        const { token } = userInfo();
        updatePopBanner(formData)
            .then(response => {
                setValues({
                    ...values,
                    disabled: false
                })
                setAddMethod({
                    success: true,
                })
                notify("Popup Banner changed successfully!")
                setTimeout(reloadPage, 2000)
            })
            .catch(err => {
                setValues({
                    ...values,
                    disabled: false
                })
                let errMsg = "Something went wrong!";
                if (err.response) errMsg = err.response.data;
                notify(errMsg)
                setTimeout(reloadPage, 2000)
            })
    }

    const reloadPage = () => {
        window.location.reload(false)
    }

    function changeActiveStatus(value) {
        const updateData = {
            activeStatus: value
        }
        updatePopBanner(updateData).then(res => console.log(res))
    }

    const addForm = () => (
        <>
            <div>
                <Card>
                    <Card.Body>
                        <Card.Header>Add Popup banner</Card.Header>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Upload popup banner</Form.Label>
                                        <Form.Control type="file" name="image" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="addGame">
                                        <Form.Label>Add Text</Form.Label>
                                        <Form.Control type="text" name="text" onChange={handleChange} placeholder="Add popup banner text" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="addGame">
                                        <Form.Label>Add Link</Form.Label>
                                        <Form.Control type="text" name="link" onChange={handleChange} placeholder="Add a link" />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <div><ButtonGroup>
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                                name="radio"
                                                value={radio.value}
                                                checked={getImage.activeStatus === radio.value}
                                                onChange={(e) => changeActiveStatus(e.currentTarget.value)}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup></div>
                                </Col>
                                <Col>
                                    <img width="20%" src={`${API}${getImage.image}`} alt="banner" />
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