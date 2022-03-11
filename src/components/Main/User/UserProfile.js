import React, {Fragment, useEffect, useState} from "react";
import "./userinfo.css"
import {userInfo} from '../../../utils/auth';
import NavBar from "../../../components/Main/Navbar/Navbar";
import Footer from "../../../components/Main/Footer";
import {getOneUser, otpSend} from "../../../Api/user";
import {adminProfileUpdate, passwordUpdate, updateVerifyPhoneNumber} from "../../../Api/userAdmin";
import Avatar from "antd/es/avatar/avatar";
import animationData from "../../../assets/lotte/34658-profile-in-mobile.json";
import {notify} from '../../../utils/notification';
import {Box, Button, Chip, Container, Grid, Modal, Paper, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {sendMessageAPI} from "../../../Api/sendMessage";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const UserProfile = () => {
    const {token, id} = userInfo();

    const [verifyOtp, setVerifyOtp] = useState({otp: 0})

    const {
        register: registerPassword,
        handleSubmit: submitPassword,
        setError: setPasswordError,
        formState: {errors: errorsPassword}
    } = useForm();
    const {
        register: registerPhone,
        handleSubmit: submitPhone,
        setError: setPhoneError,
        formState: {errors: errorsPhone}
    } = useForm();

    const {
        register: checkOtp,
        handleSubmit: submitOTP,
        setError: setOTPError,
        formState: {errors: errorsOTP}
    } = useForm();
    const [admin, setAdmin] = useState(
        {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phonenumber: '',
            disabled: false,
            formData: '',
        }
    )
    const [name, setName] = useState({
        username: '',
        profilePic: ''
    })
    // const {username, email, password, confirmPassword, phonenumber, disabled, image, formData} = admin

    useEffect(() => {
        getOneUser(token, id)
            .then(response => setAdmin(response.data))
            .then(response => setAdmin({formData: new FormData()}))
    }, []);

    useEffect(() => {
        getOneUser(id).then(response => setName(response.data))
    },[])
    useEffect(() => {
        setAdmin({
            ...admin,
            formData: new FormData()
        })
    }, [])


    const handleChange = (e) => {
        const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
        formData.set(e.target.name, value);
        setAdmin({
            ...admin,
            [e.target.name]: value,
        })

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [phone, setPhone] = React.useState(false);
    const handleOpenPhone = () => setPhone(true);
    const handleClosePhone = () => setPhone(false);
    const [otp, setOtp] = React.useState(false);
    const handleOpenOtp = () => setOtp(true);
    const handleCloseOtp = () => setOtp(false);
    const [pnumber, setPnumber] = React.useState(false);
    const handleOpenPnumber = () => setPnumber(true);
    const handleClosePnumber = () => setPnumber(false);


    function handleClick() {
        handleOpen()
    }

    async function handleSubmitPassword(data) {
        if (data.newPassword !== data.newRePassword) {
            setPasswordError("newRePassword", {type: 'notMatched', message: 'password do not match'})
        } else {
            const update = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                email: name.email
            }

            await passwordUpdate(token, id, update).then(res => {
                if (res.data === "password updated!") {
                    notify('Profile Updated')
                    handleClose()
                } else if (res.data === "wrong password!") {
                    setPasswordError("oldPassword", {type: 'notMatched', message: 'old password do not match'})
                }
            })
        }
    }

    function addPhoneNumber() {
        handleOpenPhone()
        // checkNumber()
    }



    const checkNumber = async () => {
        console.log(number)
        let val = Math.floor(1000 + Math.random() * 9000);
        await setVerifyOtp({
            otp: val
        })
        let sms = `Sizishop OTP Code: ${val}`
        let sendMessage = {
            number: number,
            message: sms.replaceAll(" ", "%20")
        }
        //console.log(val)
        otpSend(id, val)
            .then(res => {
                handleClosePhone()
                handleOpenOtp()
                sendMessageAPI(sendMessage).then(r => {

                })
            })

        // return (
        //     setOtp(true),
        //         setPhone_number(false),
        //         setPassword(false)
        // )
    }
    const [number, setNumber] = useState({})

    // async function sendOtp(data) {
    //     setNumber(data)
    //     await adminProfileUpdate(token, id, number).then(r => {
    //         console.log(r)
    //         handleCloseOtp()
    //     }).catch((error) => {
    //         // Error
    //         if (error.response) {
    //             console.log(error.response)
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             // console.log(error.response.data);
    //             // console.log(error.response.status);
    //             // console.log(error.response.headers);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             // `error.request` is an instance of XMLHttpRequest in the
    //             // browser and an instance of
    //             // http.ClientRequest in node.js
    //             console.log('das',error.request);
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //         console.log('dsa',error.config);
    //     });
    // }

    async function updateVerify(data) {
        if (data.otp * 1 === verifyOtp.otp) {
            const sendData = {
                phoneNumberVerify : true,
                phonenumber: number,
                email : name.email
            }
            await updateVerifyPhoneNumber(token, id, sendData).then(r => {
                handleCloseOtp()
                handleClosePhone()
                handleClosePnumber()
                setOtp(false)
                setName(r.data)

            }).catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }

                });
        } else {
            console.log('not matched')
            setOTPError('otp', {type: 'notMatched', message: 'otp do not matched'})
        }
    }

    let letter = '';
    var userNameLetter = name.username.match(/\b(\w)/g);
    if (userNameLetter) {
        userNameLetter.map(a => {
            letter = letter + a
        })
    }


    function verifyPhoneNumber(number) {
        handleOpenPnumber()
        setNumber(number)
        //checkNumber(number)
    }

    async function createPhoneNumber(data) {
        const update = {
            phonenumber : data.phonenumber
        }

        console.log(update)
        await adminProfileUpdate(token, id, update).then(r => {
            setName({
                ...name,
                phonenumber : data.phonenumber
            })
            handleClosePhone()
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                if (error.response.status===400){
                    setPhoneError('phonenumber', {message: error.response.data })
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

        });
    }

    async function changeNumber(data) {
        console.log(data)
        if (data.phonenumber !== number) {
            await adminProfileUpdate(token, id, update)
        }
        checkNumber(data.phonenumber)
    }

    return (
        <>
            <Modal open={otp}
                   onClose={handleCloseOtp}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <form onSubmit={submitOTP(updateVerify)}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Type OTP
                        </Typography>
                        <TextField {...checkOtp("otp", {required: "Otp is required",})}
                                   error={Boolean(errorsPhone.otp)}
                                   helperText={errorsPhone.otp?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}} label="OTP" variant="outlined"
                                   type="number"/>
                        <Box style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
                            <Button variant="outlined" type='submit'  style={{marginRight: 5}} >
                                Verify Number
                            </Button>
                            <Button variant="outlined"  onClick={handleCloseOtp}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>

            <Modal open={pnumber}
                   onClose={handleClosePnumber}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <form
                   onSubmit={submitPhone(changeNumber)}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Your Number
                        </Typography>
                        <TextField {...registerPhone("phonenumber", {required: "Phone Number is required",})}
                                   defaultValue={number}
                                   error={Boolean(errorsPhone.phonenumber)}
                                   helperText={errorsPhone.phonenumber?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}} label="Phone Number" variant="outlined"
                                   type="number"/>
                        <Box style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
                            <Button variant="outlined" type='submit' style={{marginRight: 5}} >
                                Send OTP
                            </Button>
                            <Button variant="outlined" onClick={handleClosePnumber}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>

            <Modal open={phone}
                   onClose={handleClosePhone}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <form onSubmit={submitPhone(createPhoneNumber)}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Phone Number
                        </Typography>
                        <TextField {...registerPhone("phonenumber", {required: "Phone Number is required",})}
                                   error={Boolean(errorsPhone.phonenumber)}
                                   helperText={errorsPhone.phonenumber?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}} label="Phone Number" variant="outlined"
                                   type="number"/>
                        <Box style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
                            <Button variant="outlined" type='submit' style={{marginRight: 5}}>
                                Save Phone Number
                            </Button>
                            <Button variant="outlined" onClick={handleClosePhone}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={submitPassword(handleSubmitPassword)}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Change Password
                        </Typography>
                        <TextField {...registerPassword("oldPassword", {required: "Old Password is required",})}
                                   error={Boolean(errorsPassword.oldPassword)}
                                   helperText={errorsPassword.oldPassword?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}} label="Old Password" variant="outlined"
                                   type="password"/>
                        <TextField {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {value: 8, message: "minimum length 8"}
                        })}
                                   error={Boolean(errorsPassword.newPassword)}
                                   helperText={errorsPassword.newPassword?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}}
                                   label="New Password" variant="outlined" type="password"/>
                        <TextField {...registerPassword("newRePassword", {
                            required: "Re-enter New password is required",
                            minLength: {value: 8, message: "minimum length 8"}
                        })}
                                   error={Boolean(errorsPassword.newRePassword)}
                                   helperText={errorsPassword.newRePassword?.message} id="outlined-basic" size="small"
                                   style={{width: '100%', marginTop: 20}}
                                   label="Re-enter New Password" variant="outlined" type="password"/>
                        <Box style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
                            <Button variant="outlined" type='submit' style={{marginRight: 5}}>
                                Submit
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>
            <NavBar/>
            <Container container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    style={{minHeight: '100vh'}}
                >
                    <div class="circle">{letter}</div>
                    <Grid item md={3} xs={12}>
                        <Typography style={{padding: 5, textAlign: 'center', fontWeight: "bold", fontSize: 18}}>
                            {name.username}
                        </Typography>
                        <Box style={{marginTop: 10}}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }} className="boxWidth">
                                <Typography className="fontSize"
                                            style={{padding: 10, fontWeight: "bold", marginTop: 10}}>
                                    User Id
                                </Typography>
                                <Typography className="fontSize"
                                            style={{padding: 10, marginTop: 10, marginRight: 0, display: ''}}>
                                    {name.userIdNo}
                                </Typography>
                            </Paper>
                        </Box>
                        <Box style={{marginTop: 10}}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }} className="boxWidth">
                                <Typography className="fontSize"
                                            style={{padding: 10, fontWeight: "bold", marginTop: 10}}>
                                    Email
                                </Typography>
                                <Typography className="fontSize"
                                            style={{padding: 10, marginTop: 10, marginRight: 0, display: ''}}>
                                    {name.email}
                                </Typography>
                            </Paper>
                        </Box>
                        <Box style={{marginTop: 10}}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }} className="boxWidth">
                                <Typography className="fontSize"
                                            style={{padding: 10, fontWeight: "bold", marginTop: 10}}>
                                    Phone Number
                                </Typography>
                                {name.phonenumber && <Box>
                                    <Typography className="fontSize"
                                                style={{padding: 10, marginTop: 10, marginRight: 0, display: ''}}>
                                        {name.phonenumber} {
                                        name.phoneNumberVerify && <Chip color={"primary"} label="Verified"/>
                                    }
                                        {
                                            !name.phoneNumberVerify &&
                                            <Chip onClick={e => verifyPhoneNumber(name.phonenumber)} color={"secondary"}
                                                  label="Verify Number"/>
                                        }
                                    </Typography>

                                </Box>}

                                {!name.phonenumber && <Chip label="Add Phone Number" onClick={e => addPhoneNumber()}
                                                            style={{
                                                                padding: 10,
                                                                fontSize: 17,
                                                                marginTop: 10,
                                                                marginRight: 0,
                                                                display: ''
                                                            }}/>}

                            </Paper>
                        </Box>
                        <Box style={{marginTop: 10}}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }} className="boxWidth">
                                <Typography className="fontSize"
                                            style={{padding: 10, fontWeight: "bold", marginTop: 10}}>
                                    Password
                                </Typography>
                                {!name.googleId && <Chip label="Change Password" onClick={handleClick}
                                                         style={{
                                                             padding: 10,
                                                             fontSize: 17,
                                                             marginTop: 10,
                                                             marginRight: 0,
                                                             display: ''
                                                         }}/>}
                                {name.googleId && <Typography className="fontSize">
                                    Logged in with google id
                                </Typography>}


                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>

        </>
    )
}

export default UserProfile