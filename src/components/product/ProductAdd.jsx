import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { addProductss, addProductImage, deleteProductImage } from "../../Api/products";
import { Alert } from "antd";
import { notify } from '../../utils/notification'
let productId;

const category = [
    {
        _id: "0",
        categoryNames: ""
    },
    {
        _id: "1",
        categoryNames: "(InGame)"
    },
    {
        _id: "2",
        categoryNames: "(IDCode)"
    },
    {
        _id: "3",
        categoryNames: "(Offer)"
    },
    {
        _id: "3",
        categoryNames: "(Subsc)"
    }

]
const ProductAdd = () => {
    const [inputList, setInputList] = useState([{
        option: "",
        price: ""
    }]);

    const [detailsList, setDetailsList] = useState([{
        region: '',
        platform: '',
        publisher: '',
    }]);

    const [addProduct, setAddProduct] = useState({
        gameName: '',
        categoryName: '',
        image: '',
        backUpLink: '',
        topUp: [],
        formData: '',
    });

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled: false
    })

    const { success, alert, disabled } = values;

    const { region, platform, publisher } = detailsList;
    const { option, price } = inputList;

    const { gameName, categoryName, image, backUpLink, details, topUp, formData } = addProduct;

    useEffect(() => {
        setAddProduct({
            ...addProduct,
            formData: new FormData()
        })
    }, [])

    const handleDetailChange = (e, index) => {
        const { name, value } = e.target
        const list = [...detailsList];
        list[index][name] = value;
        setDetailsList(list)
        setAddProduct({
            ...addProduct,
            details: detailsList
        })
        formData.set("details", JSON.stringify(details))
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        setAddProduct({
            ...addProduct,
            topUp: inputList
        })
        formData.set("topUp", JSON.stringify(topUp))
    };

    const handleChange = (e, index) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAddProduct({
            ...addProduct,
            [e.target.name]: value,
        })
    }


    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { option: "", price: "" }]);
    };


    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, disabled: true });

        addProductss(formData)
            .then(response => {
                setAddProduct({
                    ...addProduct,
                    gameName: '',
                    categoryName: '',
                    image: '',
                    backUpLink: '',
                    detail: detailsList,
                    topUp: inputList,
                    success: true,
                })
                setValues({
                    success: true,
                    alert: false,
                    disabled: false
                })
            })
            .catch(err => {
                let errMsg = "Something went wrong!";
                if (err.response) errMsg = err.response.data;
                notify(`${errMsg}`)
                setValues({
                    disabled: false
                })
            })

    }

    const addForm = () => (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload a file</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="addGame">
                            <Form.Label>Add Backup Code Link</Form.Label>
                            <Form.Control type="game" name="backUpLink" placeholder="Backup Code Link" value={backUpLink}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="addGame">
                            <Form.Label>Add Game</Form.Label>
                            <Form.Control type="game" name="gameName" placeholder="Game name" value={gameName}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Control as="select" aria-label="Default select example" defaultValue="State..."
                            value={categoryName} name="categoryName" onChange={handleChange}>
                            <option>Select an account type</option>
                            {
                                category.map((data, index) => {
                                    return (
                                        <option key={index}>{data.categoryNames}</option>
                                    )
                                }
                                )
                            }
                        </Form.Control>
                        {/*<Form.Group className="mb-3" controlId="addCategory">*/}
                        {/*    <Form.Label>Add Category</Form.Label>*/}
                        {/*    <Form.Control type="category" name="categoryName" placeholder="Category name"*/}
                        {/*        value={categoryName} onChange={handleChange} />*/}
                        {/*</Form.Group>*/}
                    </Col>
                </Row>

                {inputList.map((x, i) => {
                    return (
                        <Row key={i}>
                            <Col>
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Product Option</Form.Label>
                                    <Form.Control type="option" name="option" placeholder="option"
                                        value={option} onChange={e => handleInputChange(e, i)} />
                                </Form.Group>
                            </Col>
                            <Col className="btn-box">
                                <Form.Group className="mb-3" controlId="addCategory">
                                    <Form.Label>Product price</Form.Label>
                                    <Form.Control type="price" name="price" placeholder="Product price"
                                        value={price} onChange={e => handleInputChange(e, i)} />
                                </Form.Group>
                            </Col>
                            <Col className="mt-4">
                                {inputList.length !== 1 && <Button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                {inputList.length - 1 === i && <Button key={i} onClick={handleAddClick}>Add</Button>}
                            </Col>
                        </Row>

                    )
                        ;
                })}

                <div>
                    <Button type="submit" variant="primary" disabled={disabled}>
                        Add new product
                    </Button>
                </div>
            </Form>

        </>
    )

    const showSuccess = () => {
        if (success) return (<>
            <Redirect to='/admin/product' />
            <Alert message="Product added" type="success" />
        </>

        )
    }


    return (
        <div>
            {showSuccess()}
            {addForm()}
        </div>
    )
}

export default ProductAdd;