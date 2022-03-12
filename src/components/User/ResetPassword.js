import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './User.css';
import { Form } from "react-bootstrap";
import { updateUser } from '../../Api/user';
import { notify } from '../../utils/notification';

const ResetPassword = (props) => {
    console.log(props)
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
        if (pass === confirmPass) {
            updateUser(userId, pass)
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

    const LoginForm = () => (
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

                                <Form onSubmit={handleSubmit} method="post" class="mt-6">
                                    <div><label classNmae="block text-gray-700">Enter Password</label>
                                        <input type="password"
                                            required
                                            id="password"
                                            placeholder="Enter new password"
                                            value={pass}
                                            onChange={handleChange} name="pass"
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
                                            onChange={handleChange} name="confirmPass"
                                            className="form-control"
                                            autofocus="autofocus"
                                            autoComplete={true}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none" />
                                    </div>


                                    <button type="submit" class="w-full block focus:bg-primary-400 text-white font-semibold rounded-lg px-4 py-3 mt-6" style={{backgroundColor: '#299078'}}>
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

    return (
        <div>
            {LoginForm()}
        </div>
    );
}

export default ResetPassword
