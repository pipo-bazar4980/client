import React, { useEffect, useState } from "react";
import { Col, Card, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { getOneProduct, updateProductss, addItems, itemDelete, updateItem, updateImage } from "../../Api/products";
import { notify } from '../../utils/notification'
import { Alert } from "antd";
import {
    Box,
    Chip,
    TextField,
    Typography,
    Button,
    Grid, Input,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CardBody } from "reactstrap";
import MenuItem from "antd/es/menu/MenuItem";
import { BiImages } from "react-icons/bi";
let formData;

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

const ProductUpdate = ({ id }) => {

    let [inputLists, setInputLists] = useState([{}]);
    const [inputList, setInputList] = useState([{
        option: "",
        price: ""
    }]);
    const { option, price } = inputList;

    const [updateProduct, setUpdateProduct] = useState({
        gameName: '',
        categoryName: '',
        backUpLink: '',
        image: '',
        details: [],
        topUp: [],
        //formData: '',
    });

    //let { formData } = updateProduct;

    const [values, setValues] = useState({
        success: false,
        alert: false,
        disabled: false
    })

    const { success, alert, disabled } = values;

    useEffect(() => {
        formData = new FormData()
        // setUpdateProduct({
        //     ...updateProduct,
        //     formData: new FormData()
        // })
    }, []);


    // const handleDetailChange = (e, index) => {
    //     const {name, value} = e.target
    //     const list = [...detailsList];
    //     list[index][name] = value;
    //     setDetailsList(list)
    //     setUpdateProduct({
    //         ...updateProduct,
    //         details: detailsList
    //     })
    //     formData.set("details", JSON.stringify(details))
    //
    // }
    // const handleInputChange = (e, index) => {
    //     const {name, value} = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);
    //     setUpdateProduct({
    //         ...updateProduct,
    //         topUp: inputList
    //     })
    //
    //     let prePackage = [];
    //     for (let i = 0; i < inputLists.length; i++) {
    //         prePackage.push({"option": inputLists[i].option, "price": inputLists[i].price})
    //     }
    //     Array.prototype.push.apply(topUp, prePackage);
    //     formData.set("topUp", JSON.stringify(topUp))
    // };
    const [image, setImage] = useState({})

    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    console.log(inputLists)
    useEffect(async () => {
        await getOneProduct(id)
            .then((res) => {
                let allData = res.data
                setUpdateProduct(allData)
                setInputLists(allData.topUp)
                setProductInfo('gameName', `${allData.gameName}`)
                setProductInfo('categoryName', `${allData.categoryName}`)
                setProductInfo('backUpLink', `${allData.backUpLink}`)

            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const handleDelete = (index) => async () => {
        await itemDelete(id, index).then(r => {
            console.log(r.data)
            setInputLists(r.data)
            notify("deleted successfully")
        })
    };

    const [show, setShow] = useState(false)
    //
    const [item, setItem] = useState({})


    const {
        register: getItem,
        handleSubmit: submitItem,
        setValue: setItemValue,
        reset: resetItem,
        formState: { errors: errorItem }
    } = useForm();
    const {
        register: getNewItem,
        handleSubmit: submitNewItem,
        setValue: setNewItemValue,
        reset: resetNewItem,
        formState: { errors: errorNewItem }
    } = useForm();
    const {
        register: productInfo,
        handleSubmit: submitProductInfo,
        setValue: setProductInfo,
        reset: resetProductInfo,
        formState: { errors: errorProductInfo }
    } = useForm();

    function handleClick(option, price, index) {
        setItem({
            id: index,
            option: option,
            price: price
        })
        setShow(true)
        setItemValue("option", `${option}`)
        setItemValue("price", `${price}`)
    }

    async function submitItemData(data) {
        const submitData = {
            topUpId: item.id,
            option: data.option,
            price: data.price
        }
        resetItem({ option: "" })
        resetItem({ price: "" })
        await updateItem(id, submitData).then(r => {
            
            setInputLists(r.data),
                notify("updated successfully")
        })
        setShow(false)
    }

    const showSuccess = () => {
        if (success) return (<>
            <Redirect to='/admin/product' />
            <Alert message="Product updated" type="success" />
        </>)
    }

    function addItem(data) {
        const addData = {
            id: item._id,
            option: data.option,
            price: data.price
        }
        addItems(id, addData).then(r => {
            setInputLists(r.data),
                notify("added successfully")
        })

    }

    async function submitInfo(data) {
        await updateProductss(id, data).then(r => {
            notify("updated successfully")
        })
    }

    const photoUpdate = () => {
        formData.set("image", image.raw)
        updateImage(id, formData)
            .then(r => {
                notify("Photo updated!")
            })
    }

    function updateForm() {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Update & Delete Product Item</Card.Title>
                        <Form.Label>Change Image</Form.Label>

                        <form onSubmit={submitProductInfo(submitInfo)}>
                            <div>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" type="file"
                                        onChange={e => handleChange(e)} />
                                    <Button onClick={photoUpdate} style={{ backgroundColor: "#1565C0", color: "white" }} >
                                        Save Photo
                                    </Button>
                                </label>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} xl={6}>
                                    <Form.Label>Select Game</Form.Label>
                                    <TextField id="outlined-basic" size="small"
                                        style={{ width: '100%' }}
                                        variant="outlined"
                                        {...productInfo("gameName")} />
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    <Form.Label>Select Category</Form.Label>
                                    <Form.Control as="select" aria-label="Default select example"
                                        name="categoryName"
                                        {...productInfo("categoryName")}>
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
                                </Grid>
                            </Grid>
                            <Form.Label>Backup Link</Form.Label>
                            <TextField id="outlined-basic" size="small"
                                style={{ width: '100%', marginBottom: 10 }}
                                variant="outlined"
                                {...productInfo("backUpLink")} />
                            <Button type='submit' variant='outline' style={{ backgroundColor: "#1565C0", color: "white" }}> Update </Button>
                        </form>

                        <hr />
                        <Form.Label>
                            Update & Delete Item
                        </Form.Label>
                        <div style={{ display: "flex", flexWrap: 'wrap' }}>

                            {inputLists?.map((x, index) => {
                                return (

                                    <Chip
                                        variant="outlined"
                                        style={{ marginRight: 10, marginTop: 10 }}
                                        label={`${x.option}  (${x.price} Taka)`}
                                        onClick={e => handleClick(x.option, x.price, x._id)}
                                        onDelete={handleDelete(x._id)}
                                    />
                                )
                            })}
                        </div>
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            {
                                show && (
                                    <form onSubmit={submitItem(submitItemData)}>
                                        <Typography>
                                            Update Product
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <TextField size="small"
                                                    style={{ width: '100%', marginTop: 10 }} label="Option"

                                                    variant="outlined" {...getItem("option")} />
                                            </Grid>
                                            <Grid item>
                                                <TextField size="small"

                                                    style={{ width: '100%', marginTop: 10 }} label="Price"
                                                    variant="outlined" {...getItem("price")}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Box style={{
                                                    display: "flex",
                                                    justifyContent: 'center',
                                                    marginTop: 10
                                                }}>
                                                    <Button variant="outlined" style={{ marginRight: 5 }}
                                                        type='submit'>
                                                        update
                                                    </Button>
                                                    <Button variant="outlined" onClick={e => setShow(false)}>
                                                        cancel
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>


                                    </form>
                                )
                            }

                        </div>
                        <form onSubmit={submitNewItem(addItem)}>
                            <hr />
                            <Form.Label>
                                Add new Item
                            </Form.Label>
                            <Grid container spacing={2}>
                                <Grid item> <TextField size="small"
                                    style={{ width: '100%', marginTop: 10 }} label="Option"
                                    variant="outlined" {...getNewItem("option")} /></Grid>
                                <Grid item> <TextField size="small"
                                    style={{ width: '100%', marginTop: 10 }} label="Price"
                                    variant="outlined" {...getNewItem("price")} /></Grid>
                                <Grid item><Button type='submit' style={{ width: '100%', marginTop: 10 }}
                                    variant="outlined">Add Item</Button></Grid>
                            </Grid>
                        </form>
                    </Card.Body>
                </Card>

            </>
        )
    }

    return (
        <div>
            {showSuccess()}
            {updateForm()}
        </div>
    )
}

export default ProductUpdate;