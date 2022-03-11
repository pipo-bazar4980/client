import React, { useState } from 'react';
import { registration } from '../Api/auth';
import "../components/User/User.css"
import { notify } from '../utils/notification'
import NavBar from "../layouts/NavBar";
import Footer from "../components/Main/Footer";
import animationData from "../assets/lotte/50124-user-profile.json";
import Lottie from "react-lottie";

const setPasswordAlert = () => {
    notify('Password Miss-matched')
}

function UserCreate() {

    const [user, setUser] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        role: '',
        success: false,
        error: false,
        disabled: false
    });

    const { username, email, password, phonenumber, role, success,disabled, error, repassword } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'role') {
            setUser(e.target.value)
        }
        console.log(e.target.name,e.target.value)
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false,disabled: true });
        if (password === repassword) {
            registration({ username, email, phonenumber, role, password })
                .then(response => {
                    notify(`${role[0].toUpperCase() + role.slice(1)} created Successfully`)
                    setValues({
                        username: '',
                        email: '',
                        phonenumber: '',
                        password: '',
                        repassword: '',
                        success: true,
                        error: false,
                        disabled: false,
                    })
                    setUser({
                        user: ''
                    })
                })
                .catch(err => {
                    let errMsg = 'Something went wrong!';
                    if (err.response) {
                        errMsg = err.response.data;
                    } else {
                        errMsg = 'Something went wrong!';
                    }
                    setValues({ ...values, error: errMsg,disabled: false, })
                })
        }
        else {
            setPasswordAlert()
        }

    }

    const signUpForm = () => (
        <>
           
            <div className="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <div data-v-791b20d9>
                        <div
                            className="min-w-screen bg-gray-200 flex items-center justify-center md:px-5 py-10 md:py-6">
                            <div className="bg-white text-gray-500 w-full overflow-hidden">
                                <div className="md:flex w-full">

                                    <div className="w-full md:w-2/3 py-10 px-5 md:px-10 relative">
                                        <div className="text-center mb-10">
                                            <h1 className="text-xl md:text-2xl font-bold leading-tight text-gray-900 text-left">
                                                Create new User
                                            </h1>
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
                                                    <div><label className="block text-gray-700">Phone Number</label> <input
                                                        placeholder="Phone Number" autoFocus="autofocus" autoComplete
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
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <div>
                                                        <label className="block text-gray-700">Role</label>
                                                        <input type="radio" id="html" name="role" value="admin" checked={user === 'admin'} onChange={handleChange} />Admin
                                                        <input type="radio" id="html" name="role" value="user" checked={user === 'user'} className='ml-3' onChange={handleChange} />User
                                                    </div>
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
                                                    <div>
                                                        <label className="block text-gray-700">Confirm Password</label>
                                                        <input type="password"
                                                            placeholder="Re Enter Password" autoComplete value={repassword}
                                                            name="repassword" required onChange={handleChange}
                                                            className="tw_form_input" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -mx-3">
                                                <div className="w-full px-3 mb-5">
                                                    <button type="submit" disabled={disabled} className="w-full block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                                                        Create User
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div style={{marginTop : "100Px"}}>
                                        <Lottie
                                            options={defaultOptions}
                                            height={500}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );

    const showError = (error) => {
        if (error) return (
            notify(`${error}`)
        )
    }

    return (
        <div>
            {showError(error)}
            {signUpForm()}
            <hr />
        </div>
    );
}

export default UserCreate;
