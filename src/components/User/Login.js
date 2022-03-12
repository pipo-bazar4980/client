import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../Api/auth'
import { isAuthenticated,authenticate } from '../../utils/auth';
import {
    AiOutlineGoogle,
    AiFillFacebook,
} from "react-icons/ai";

import './User.css';
import { Form } from "react-bootstrap";
import { notify } from '../../utils/notification'
import NavBar from "../../layouts/NavBar";
import Footer from "../Main/Footer";
let jwt = null;
import { getJwt, removeJwt } from "../../Api/user";

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        success: false,
        error: false,
        disabled: false,
    });

    useEffect(() => {
        getJwt()
            .then(res => {
                jwt = res.data
                getJwtToken()
            })
    });


    const getJwtToken = () => {
        if (jwt) {
            authenticate(jwt, () => {
                let jwtToken = localStorage.getItem('jwt')
                if (jwtToken) {
                    return (
                        setValues({
                            ...values,
                            success: true,
                            error: false,
                        })
                    )
                }

            })
        }
    }

    const { email, password, success, error, disabled } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, disabled: true })
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        success: true,
                        error: false,
                        disabled: false,
                    })
                })
            })
            // .catch(err => {
            //     let errMsg = 'Something went wrong!';
            //     if (err.response) {
            //         errMsg = err.response.data;
            //     } else {
            //         errMsg = 'Something went wrong!';
            //     }
            //     setValues({ ...values, error: errMsg, disabled: false })
            // })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const LoginForm = () => (
        <>
            <NavBar />
            <div class="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <section class="flex flex-col md:flex-row items-center md:justify-center py-10 md:py-6" data-v-791b20d9>
                        <div class="bg-white w-full md:w-[450px] px-6 lg:px-8 flex items-start py-12 justify-center relative flex-shrink">
                            <div class="w-full h-full">
                                <h1 class="text-xl md:text-2xl font-bold leading-tight">
                                    Log in to your account
                                </h1>
                                <Form onSubmit={handleSubmit} method="post" class="mt-6">
                                    <div><label class="block text-gray-700">Email Address</label>
                                        <input type="email" name="email" className="form-control" placeholder="Enter Email" value={email} required onChange={handleChange} autofocus="autofocus"
                                            autoComplete={true}
                                            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none" />
                                    </div>

                                    <div class="mt-4"><label class="block text-gray-700">Password</label> <input
                                        type="password" name="password" className="form-control" value={password} required onChange={handleChange} placeholder="Enter Password" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500
            focus:bg-white focus:outline-none"/></div>

                                    <div class="text-right mt-2"><Link to="forgotPassword"
                                        class="text-sm font-semibold text-gray-700 hover:text-primary-700 focus:text-primary-700">Forgot
                                        Password?</Link></div>
                                    <button style={{backgroundColor: '#299078', borderColor: '#299078' }} onSubmit={handleSubmit} disabled={disabled} type="submit" class="w-full block   0 text-white font-semibold rounded-lg
          px-4 py-3 mt-6">
                                        Login
                                    </button>
                                    <div className="flex-c-m">
                                        <div style={{ fontWeight: "bold" }}>Login with </div>
                                        {/* <a href="http://localhost:3001/auth/facebook" className="login100-social-item bg3">
                                            <AiOutlineGoogle />
                                        </a> */}

                                        <a href="https://cizishop-backend2334.herokuapp.com/auth/google" style={{color: '#299078', borderColor: '#299078'}} className="login100-social-item ">
                                            <AiOutlineGoogle  />
                                        </a>

                                    </div>
                                </Form>
                                <hr class="my-6 border-gray-300 w-full" />

                                <p class="mt-5 text-center ">
                                    Need an account?
                                    <Link to='registration'
                                          style={{color : '#299078'}}
                                        class="text-primary-500 hover:text-primary-700 font-semibold ml-2">Create an
                                        account</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );

    const showSuccess = () => {
        if (success) return (
            <Redirect to='/' />
        )
    }

    const showError = (error) => {
        if (error.success == false) return (
            notify(`${error.error}`)
        )
    }

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/" /> : ""}
            {showSuccess()}
            {showError(error)}
            {LoginForm()}
        </div>
    );
}

export default Login;