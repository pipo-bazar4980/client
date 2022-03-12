import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { registration } from '../../Api/auth';
import { isAuthenticated, authenticate } from '../../utils/auth';
import "./User.css"
import { notify } from '../../utils/notification'
import { Alert } from "antd";
import NavBar from "../../layouts/NavBar";
import Footer from "../Main/Footer";
import { GoogleLogin } from 'react-google-login';
import Lottie from "react-lottie";
import animationData from "../../assets/lotte/50124-user-profile.json";
import { AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";


const setPasswordAlert = () => (
    notify('Password Miss-matched')
)

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        success: false,
        error: false,
        disabled: false,
    });

    const { username, email, password, phonenumber, success, error, repassword, disabled } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values)
        setValues({ ...values, error: false, disabled: true });
        if (password === repassword) {
            registration({ username, email, phonenumber, password  })
                .then(response => {
                    authenticate(response.data.token, () => {
                        setValues({
                            username: '',
                            email: '',
                            phonenumber: '',
                            password: '',
                            success: true,
                            error: false,
                            disabled: false,
                        })
                    })
                })
                .catch(err => {
                    let errMsg = 'Something went wrong!';
                    if (err.response) {
                        errMsg = err.response.data;
                    } else {
                        errMsg = 'Something went wrong!';
                    }
                    setValues({ ...values, error: errMsg, disabled: false })
                })
        } else {
            setPasswordAlert()
            setValues({ ...values, disabled: false })
        }

    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const signUpForm = () => (
        <>
            <NavBar />
            <div className="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <div data-v-791b20d9>
                        <div
                            className="min-w-screen bg-gray-200 flex items-center justify-center md:px-5 py-10 md:py-6">
                            <div className="bg-white text-gray-500 w-full overflow-hidden">
                                <div className="md:flex w-full">
                                    <div className="hidden md:block w-1/3  py-10 px-10">
                                        <div style={{ marginTop: "100Px" }}>
                                            <Lottie
                                                options={defaultOptions}
                                                height={500}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3 py-10 px-5 md:px-10 relative">
                                        <div className="text-center mb-10">
                                            <h1 className="text-xl md:text-2xl font-bold leading-tight text-gray-900 text-left">
                                                Create new account
                                            </h1>
                                        </div>
                                        <div className="mb-7">
                                            <button type="button"
                                                className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                                                <div className="flex items-center justify-center">
                                                    <div>Login with </div>
                                                    <div className="flex-c-m">

                                                        <a href="https://cizishop-backend2334.herokuapp.com/auth/google"
                                                            className="login100-social-item bg3">
                                                            <AiOutlineGoogle />
                                                        </a>
                                                    </div>

                                                </div>
                                            </button>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex -mx-3 flex-wrap">
                                                <div className="w-full md:w-1/2 px-3 mb-5">
                                                    <div><label className="block text-gray-700">Username</label> <input
                                                        type="text"
                                                        placeholder="Enter Username" autoFocus="autofocus" autoComplete
                                                        name="username"
                                                        value={username}
                                                        className="tw_form_input" required onChange={handleChange} />
                                                    </div>

                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-5">
                                                    <div><label className="block text-gray-700">Phone Number</label>
                                                        <input
                                                            placeholder="Phone Number" autoFocus="autofocus"
                                                            autoComplete
                                                            type="tel" value={phonenumber} name="phonenumber"
                                                            className="tw_form_input" required onChange={handleChange} />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <div><label className="block text-gray-700">Email</label> <input
                                                        type="email"
                                                        placeholder="Enter Email" autoComplete value={email}
                                                        name="email" required onChange={handleChange}
                                                        className="tw_form_input" /></div>

                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="w-full md:w-1/2 px-3 mb-5">
                                                    <div><label className="block text-gray-700">Password</label> <input
                                                        type="password"
                                                        placeholder="Enter Password" autoComplete value={password}
                                                        name="password" required onChange={handleChange}
                                                        className="tw_form_input" /></div>

                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-5">
                                                    <div><label className="block text-gray-700">Confirm Password</label>
                                                        <input type="password"

                                                            placeholder="Re-enter Password" autoComplete

                                                            value={repassword}
                                                            name="repassword" required onChange={handleChange}
                                                            className="tw_form_input" /></div>

                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <button type="submit" disabled={disabled}
                                                        className="w-full block text-white font-semibold rounded-lg  x-4 py-3 mt-6" style={{backgroundColor:"#299078"}}>
                                                        REGISTER NOW
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="mt-4 d-flex justify-content-center ml-4">
                                            <div>
                                                Have an account?
                                            </div>


                                            <Link to='login'
                                                className="ml-2 font-semibold" style={{color:"#299078"}}>Login
                                                here</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

    const showSuccess = () => {
        if (success) return (
            <Redirect to='/admin' />
        )
    }

    const showError = (error) => {
        if (error) return (
            notify(`${error}`)
        )
    }

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/" /> : ""}
            {showSuccess()}
            {showError(error)}
            {signUpForm()}
            <hr />
        </div>
    );
}

export default Register;