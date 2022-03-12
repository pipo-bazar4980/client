import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './User.css';
import { Form } from "react-bootstrap";
import NavBar from "../../layouts/NavBar";
import Footer from "../Main/Footer";
import {findUserByPhoneNumber, otpSend, getOneUser, updateUser, updateUserPassword} from '../../Api/user';
import { notify } from '../../utils/notification';
import { sendMessageAPI } from '../../Api/sendMessage';
let mobileNumber, userNumber, userId, val;

const ForgotPassword = () => {
    const history = useHistory();
    let [phone_number, setPhone_number] = useState(true)
    let [otp, setOtp] = useState(false)
    let [password, setPassword] = useState(false)

    useEffect(() => {
        mobileNumber = '', userNumber = '', userId = '', val = ''
    }, [])

    const [phoneNumber, setPhoneNumber] = useState({
        number: '',
        disabled: ''
    });
    let { number, disabled } = phoneNumber


    const [otpCode, setOtpCode] = useState({
        otpNum: '',
    });

    let { otpNum } = otpCode

    const handleChange = e => {
        setPhoneNumber({
            [e.target.name]: e.target.value
        })
        mobileNumber = e.target.value;
    }

    const handleChangeOTP = e => {
        setOtpCode({
            [e.target.name]: e.target.value
        })
        mobileNumber = e.target.value;
    }

    const handleSubmitOTP = e => {
        e.preventDefault();
        getOneUser(userId)
            .then(res => {
                if (res.data.otp === parseInt(otpNum)) {
                    return (
                        setOtp(false),
                        setPhone_number(false),
                        setPassword(true)
                    )
                }
                else {
                    notify('Invalid OTP')
                }
            })
    }

    const checkNumber = () => {
        val = Math.floor(1000 + Math.random() * 9000);
        let sms = `Sizishop OTP Code: ${val}`
        let sendMessage = {
            number: userNumber,
            message: sms.replaceAll(" ", "%20")
        }
        otpSend(userId, val)
            .then(res => {
                sendMessageAPI(sendMessage)
            })

        return (
            setOtp(true),
            setPhone_number(false),
            setPassword(false)
        )
    }

    const handleSubmit = e => {
        e.preventDefault();
        disabled = true
        findUserByPhoneNumber(mobileNumber)
            .then(res => {
                userId = res.data[0]._id
                userNumber = res.data[0].phonenumber
                checkNumber()
            })
            .catch(err => notify('No match found to this number!'))
    }

    const [passwordSet, setPasswordSet] = useState({
        pass: '',
        confirmPass: ''
    });

    const { pass, confirmPass } = passwordSet;

    const handleChangePassword = e => {
        setPasswordSet({
            ...passwordSet,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitPassword = e => {
        e.preventDefault();
        console.log(pass)
        if (pass === confirmPass) {
            updateUserPassword( userId, pass)
                .then(res => {
                    notify('Password Reset Successful')
                    history.push({
                        pathname: '/login',
                    });
                })
        } else {
            notify('Password does not match!')
            setPasswordSet({
                pass: '',
                confirmPass: ''
            })
        }
    }


    const sendNumberPage = () => {
        return (
            <div class="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <section class="flex flex-col md:flex-row items-center md:justify-center py-10 md:py-6" data-v-791b20d9>
                        <div class="bg-white w-full md:w-[450px] px-6 lg:px-8 flex items-start py-12 justify-center relative flex-shrink">
                            <div class="w-full h-full">
                                <h1 class="text-xl md:text-2xl font-bold leading-tight">
                                    Forgot Password
                                </h1>

                                <Form onSubmit={handleSubmit} class="mt-6">
                                    <p className="forgotpassword-screen__subtext">
                                        Please enter the phone number you register your account with. We
                                        will send you OTP code to this phone number
                                    </p>
                                    <div><label class="block text-gray-700">Enter Phone </label>
                                        <input type="phonenumber" name="phonenumber" className="form-control" placeholder="Enter Phone number" value={number} required onChange={handleChange} />
                                    </div>
                                    <button type="submit" disabled={disabled} class="w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6" style={{backgroundColor: '#299078'}}>
                                        Submit
                                    </button>
                                </Form>
                                <hr class="my-6 border-gray-300 w-full" />
                                <p class="mt-5 text-center">
                                    Need an account?
                                    <Link to='registration'
                                        class="text-primary-500 hover:text-primary-700 font-semibold">Create an
                                        account</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    const passwordForm = () => (
        <>
            <div class="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <section class="flex flex-col md:flex-row items-center md:justify-center py-10 md:py-6"
                        data-v-791b20d9>
                        <div
                            className="bg-white w-full md:w-[450px] px-6 lg:px-8 flex items-start py-12 justify-center relative flex-shrink">
                            <div className="w-full h-full">
                                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                                    Forgot Password
                                </h1>

                                <Form onSubmit={handleSubmitPassword} method="post" class="mt-6">
                                    <div><label classNmae="block text-gray-700">Enter Password</label>
                                        <input type="password"
                                            required
                                            id="password"
                                            placeholder="Enter new password"
                                            value={pass}
                                            onChange={handleChangePassword} name="pass"
                                            className="form-control"
                                            autofocus="autofocus"
                                            autoComplete={true}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none" />
                                    </div>
                                    <div><label className="block text-gray-700">Confirm Password</label>
                                        <input type="password"
                                            required
                                            id="password"
                                            placeholder="Confirm password"
                                            value={confirmPass}
                                            onChange={handleChangePassword} name="confirmPass"
                                            className="form-control"
                                            autofocus="autofocus"
                                            autoComplete={true}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none" />
                                    </div>


                                    <button type="submit" class="w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6" style={{backgroundColor: '#299078'}}>
                                        Reset Password
                                    </button>
                                </Form>
                                <hr class="my-6 border-gray-300 w-full" />

                                <p class="mt-5 text-center">
                                    Need an account?
                                    <Link to='registration' class="text-primary-500 hover:text-primary-700 font-semibold">Create an account</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );

    const otpPage = () => {
        return (
            <div class="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <section class="flex flex-col md:flex-row items-center md:justify-center py-10 md:py-6" data-v-791b20d9>
                        <div class="bg-white w-full md:w-[450px] px-6 lg:px-8 flex items-start py-12 justify-center relative flex-shrink">
                            <div class="w-full h-full">
                                <Form onSubmit={handleSubmitOTP} class="mt-6">
                                    <div><label class="block text-gray-700">OTP </label>
                                        <input type="otpNum" name="otpNum" className="form-control" placeholder="Enter OTP code" value={otpNum} required onChange={handleChangeOTP} />
                                    </div>
                                    <button type="submit" disabled={disabled} class="w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6" style={{backgroundColor: '#299078'}}>
                                        Submit
                                    </button>
                                </Form>
                                <hr class="my-6 border-gray-300 w-full" />
                                <p class="mt-5 text-center">
                                    Need an account?
                                    <Link to='registration'
                                        class="text-primary-500 hover:text-primary-700 font-semibold">Create an
                                        account</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }


    const LoginForm = () => (
        <>
            <NavBar />
            {phone_number && (
                <div>
                    {sendNumberPage()}
                </div>
            )}
            {otp && (
                <div>
                    {otpPage()}
                </div>
            )}
            {password && (
                <div>
                    {passwordForm()}
                </div>
            )}

            <Footer />
        </>
    );
    return (
        <div>
            {LoginForm()}
        </div>
    );
}

export default ForgotPassword