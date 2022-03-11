import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { addBanners } from "../../../Api/utility";
import { userInfo } from '../../../utils/auth';
import { Alert } from "antd";
import { notify } from '../../../utils/notification'

const AddBanner = () => {
    const [addBanner, setAddBanner] = useState({
        firstTitle: '',
        secondTitle: '',
        link: '',
        formData: '',
    });

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled: false,
    })
    let { success, alert, disabled } = values;
    const { firstTitle, secondTitle, link, formData } = addBanner

    useEffect(() => {
        setAddBanner({
            ...addBanner,
            formData: new FormData()
        })
    }, [])

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAddBanner({
            ...addBanner,
            [e.target.name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({
            ...values,
            disabled: true
        })

        setAddBanner({
            ...addBanner
        })
        const { token } = userInfo();
        addBanners(token, formData)
            .then(response => {
                setAddBanner({
                    firstTitle: '',
                    secondTitle: '',
                    link: '',
                    success: true,
                })
                notify("Banner Added successfully!")
                setValues({
                    ...values,
                    disabled: false
                })
                setTimeout(reloadPage, 5000)
            })
            .catch(err => {
                setValues({
                    ...values,
                    disabled: false
                })
                let errMsg = "Something went wrong!";
                if (err.response) errMsg = err.response.data;
                notify(errMsg)
                setTimeout(reloadPage, 5000)
            })
    }

    const reloadPage = () => {
        window.location.reload(false)
    }

    const BannerForm = () => (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload a file</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
                    </Form.Group>
                    <Row>

                        <Col>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>First Title</Form.Label>
                                <Form.Control placeholder="firstTitle" type="firstTitle" name="firstTitle"
                                    value={firstTitle} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Second Title</Form.Label>
                                <Form.Control placeholder="Second Title" type="secondTitle" name="secondTitle"
                                    value={secondTitle} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Link</Form.Label>
                                <Form.Control placeholder="Link" type="link" name="link"
                                    value={link} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" disabled={disabled}>
                        Add
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )

    return (
        <>
            {BannerForm()}
        </>
    )
}

export default AddBanner