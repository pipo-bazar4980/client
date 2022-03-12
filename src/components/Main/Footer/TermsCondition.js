import React from "react";
import {Card, Container} from "react-bootstrap";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import "./privacy.css"

const TermsCondition = () => {
    return (
        <>
            <NavBar/>
            <div className="mx-auto mt-5 mb-5">
                <div>
                    <div className="container mx-auto shadow-md bg-white" data-v-cc50df86>
                        <div className="my-3 md:flex p-3 py-6" data-v-cc50df86>
                            <div className="content" data-v-cc50df86><h3 data-v-cc50df86>Term of Use</h3>
                                <p className="_subtitle1" data-v-cc50df86>
                                    This website (the ″Site″) is owned and operated by selften. These Terms and
                                    Conditions of Use (the ″Terms of Use″) apply to the Selften Site at
                                    www.selften.com. Throughout the Site, the terms ″we,″ ″us″ and ″our″ refer to
                                    selften. BY USING THIS SITE, YOU ARE ACKNOWLEDGING THAT YOU HAVE READ AND
                                    UNDERSTOOD THE TERMS OF USE, INCLUDING, AND AGREE TO BE BOUND BY THE TERMS OF
                                    USE. IF YOU DO NOT AGREE, PLEASE DO NOT USE THIS SITE.
                                </p>
                                <p className="_subtitle1" data-v-cc50df86>
                                    Should you breach any of these Terms of Service, SELFTEN shall have the
                                    exclusive sole and absolute right to terminate, discontinue or withdraw the
                                    provision of the Service to you. In the event of a breach by you, we reserves
                                    its right to pursue any remedy or relief in so far as permitted by law, which
                                    includes but is not limited to injunction, damages and/or specific performance.
                                </p>
                                <h3 data-v-cc50df86>Description of the Service</h3>
                                <p data-v-cc50df86>
                                    1. You must be 14 years or older to use the Service. Parental consent is needed
                                    or involvement shall be required in the event that you have not attained the age
                                    of 14.
                                </p>
                                <p data-v-cc50df86>
                                    2. You must provide your full legal name, current address, a valid email
                                    address, and any other information needed in order to complete the signup
                                    process. All information provided by you shall be true, accurate, current and
                                    complete.
                                </p></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default TermsCondition