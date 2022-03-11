import React, { Fragment, useEffect, useState } from "react";
import "../components/Main/User/userinfo.css"
import { userInfo } from '../utils/auth';
import { getOneUser, otpSend } from "../Api/user";
import { adminProfileUpdate, passwordUpdate } from "../Api/userAdmin";
import Avatar from "antd/es/avatar/avatar";
import animationData from "../assets/lotte/34658-profile-in-mobile.json";
import { notify } from '../utils/notification';
import { Box, Button, Chip, Container, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { sendMessageAPI } from "../Api/sendMessage";

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
    const { token, id } = userInfo();
    const {
        register: registerPassword,
        handleSubmit: submitPassword,
        setError: setPasswordError,
        formState: { errors: errorsPassword }
    } = useForm();
    const {
        register: registerPhone,
        handleSubmit: submitPhone,
        setError: setPhoneError,
        formState: { errors: errorsPhone }
    } = useForm();
    const {
        register: checkOtp,
        handleSubmit: submitOTP,
        setError: setOTPError,
        formState: { errors: errorsOTP }
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
            .then(response => setAdmin({ formData: new FormData() }))
    }, []);

    useEffect(() => {
        getOneUser(id).then(response => setName(response.data))
    })
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


    function handleClick() {
        handleOpen()
    }

    async function handleSubmitPassword(data) {
        if (data.newPassword !== data.newRePassword) {
            setPasswordError("newRePassword", { type: 'notMatched', message: 'password do not match' })
        } else {
            const update = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                email: name.email
            }
            console.log(update)
            await passwordUpdate(token, id, update).then(res => {
                if (res.data === "password updated!") {
                    notify('Profile Updated')
                    handleClose()
                } else if (res.data === "wrong password!") {
                    setPasswordError("oldPassword", { type: 'notMatched', message: 'old password do not match' })
                }
            })
        }
    }

    function addPhoneNumber() {
        handleOpenPhone()
        // checkNumber()
    }

    const [verifyOtp, setVerifyOtp] = useState({})

    const checkNumber = (userNumber) => {
        let val = Math.floor(1000 + Math.random() * 9000);
        setVerifyOtp({
            otp: val
        })
        let sms = `Sizishop OTP Code: ${val}`
        let sendMessage = {
            number: userNumber,
            message: sms.replaceAll(" ", "%20")
        }
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
    function sendOtp(data) {
        setNumber(data)
        checkNumber(data.phonenumber)
    }

    async function updatePhoneNumber(data) {
        if (data.otp * 1 === verifyOtp.otp) {
            await adminProfileUpdate(token, id, number)
                .then(r => {
                    console.log(r)
                    handleCloseOtp()
                })
                .catch(err => {
                    notify("Number already exists!")
                    handleCloseOtp()
                })
        }
        else {
            console.log('not matched')
            setOTPError('otp', { type: 'notMatched', message: 'otp do not matched' })
        }

    }

    let letter = '';
    var userNameLetter = name.username.match(/\b(\w)/g);
    if (userNameLetter) {
        userNameLetter.map(a => {
            letter = letter + a
        })
    }

    return (
        <>
            <Modal open={otp}
                onClose={handleCloseOtp}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <form onSubmit={submitOTP(updatePhoneNumber)}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Type OTP
                        </Typography>
                        <TextField {...checkOtp("otp", { required: "Otp is required", })}
                            error={Boolean(errorsPhone.otp)}
                            helperText={errorsPhone.otp?.message} id="outlined-basic" size="small"
                            style={{ width: '100%', marginTop: 20 }} label="OTP" variant="outlined"
                            type="number" />
                        <Box style={{ display: "flex", justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="outlined" type='submit' style={{ marginRight: 5 }}>
                                Save Number
                            </Button>
                            <Button variant="outlined" onClick={handleCloseOtp}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>
            <Modal open={phone}
                onClose={handleClosePhone}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <form onSubmit={submitPhone(sendOtp)}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Phone Number
                        </Typography>
                        <TextField {...registerPhone("phonenumber", { required: "Phone Number is required", })}
                            error={Boolean(errorsPhone.phonenumber)}
                            helperText={errorsPhone.phonenumber?.message} id="outlined-basic" size="small"
                            style={{ width: '100%', marginTop: 20 }} label="Phone Number" variant="outlined"
                            type="number" />
                        <Box style={{ display: "flex", justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="outlined" type='submit' style={{ marginRight: 5 }}>
                                Send Token
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
                        <TextField {...registerPassword("oldPassword", { required: "Old Password is required", })}
                            error={Boolean(errorsPassword.oldPassword)}
                            helperText={errorsPassword.oldPassword?.message} id="outlined-basic" size="small"
                            style={{ width: '100%', marginTop: 20 }} label="Old Password" variant="outlined"
                            type="password" />
                        <TextField {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: { value: 8, message: "minimum length 8" }
                        })}
                            error={Boolean(errorsPassword.newPassword)}
                            helperText={errorsPassword.newPassword?.message} id="outlined-basic" size="small"
                            style={{ width: '100%', marginTop: 20 }}
                            label="New Password" variant="outlined" type="password" />
                        <TextField {...registerPassword("newRePassword", {
                            required: "Re-enter New password is required",
                            minLength: { value: 8, message: "minimum length 8" }
                        })}
                            error={Boolean(errorsPassword.newRePassword)}
                            helperText={errorsPassword.newRePassword?.message} id="outlined-basic" size="small"
                            style={{ width: '100%', marginTop: 20 }}
                            label="Re-enter New Password" variant="outlined" type="password" />
                        <Box style={{ display: "flex", justifyContent: 'center', marginTop: 10 }}>
                            <Button variant="outlined" type='submit' style={{ marginRight: 5 }}>
                                Submit
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                cancel
                            </Button>
                        </Box>
                    </Box>
                </form>

            </Modal>

            <Container container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    style={{ minHeight: '100vh' }}
                >

                    <div class="circle">{letter}</div>
                    
                    <Grid item xs={3}>
                        <Typography style={{ padding: 5, textAlign: 'center', fontWeight: "bold", fontSize: 18 }}>
                            {name.username}
                        </Typography>
                        <Box style={{ marginTop: 10 }}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                minWidth: 400
                            }}>
                                <Typography style={{ padding: 10, fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                                    User Id
                                </Typography>
                                <Typography
                                    style={{ padding: 10, fontSize: 17, marginTop: 10, marginRight: 0, display: '' }}>
                                    {name.userIdNo}
                                </Typography>
                            </Paper>
                        </Box>
                        <Box style={{ marginTop: 10 }}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                minWidth: 400
                            }}>
                                <Typography style={{ padding: 10, fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                                    Email
                                </Typography>
                                <Typography
                                    style={{ padding: 10, fontSize: 17, marginTop: 10, marginRight: 0, display: '' }}>
                                    {name.email}
                                </Typography>
                            </Paper>
                        </Box>
                        <Box style={{ marginTop: 10 }}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                minWidth: 400
                            }}>
                                <Typography style={{ padding: 10, fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                                    Phone Number
                                </Typography>
                                {name.phonenumber && <Typography
                                    style={{ padding: 10, fontSize: 17, marginTop: 10, marginRight: 0, display: '' }}>
                                    {name.phonenumber}
                                </Typography>}
                                {!name.phonenumber && <Chip label="Add Phone Number" onClick={e => addPhoneNumber()}
                                    style={{
                                        padding: 10,
                                        fontSize: 17,
                                        marginTop: 10,
                                        marginRight: 0,
                                        display: ''
                                    }} />}

                            </Paper>
                        </Box>
                        <Box style={{ marginTop: 10 }}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                minWidth: 400
                            }}>
                                <Typography style={{ padding: 10, fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                                    Password
                                </Typography>
                                {!name.googleId && <Chip label="Change Password" onClick={handleClick}
                                    style={{
                                        padding: 10,
                                        fontSize: 17,
                                        marginTop: 10,
                                        marginRight: 0,
                                        display: ''
                                    }} />}
                                {name.googleId && <Typography>
                                    Logged in with google id
                                </Typography>}


                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default UserProfile