import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import "./privacy.css"

const PrivacyPolicy = () => {
    return (
        <>
            <NavBar/>
            <div className="mx-auto">
                <div>
                    <div className="container mx-auto shadow-md bg-white" data-v-a950b0be>
                        <div className="my-3 md:flex p-3 py-6" data-v-a950b0be>
                            <div className="font-bold" className="content" data-v-a950b0be><h3 data-v-a950b0be>Privacy Policy</h3>
                                <p  className="_subtitle1" data-v-a950b0be>
                                    Your privacy is important to us. It is Sizishop policy to respect your privacy
                                    and comply with any applicable law and regulation regarding any personal
                                    information we may collect about you, including across our website :
                                    https://www.Sizishop.com
                                </p>
                                <h3 data-v-a950b0be>Information We Collect</h3>
                                <h3 className="!text-lg !py-0" data-v-a950b0be>Log Data</h3>
                                <p className="_subtitle1" data-v-a950b0be>
                                    When you visit our website, our servers may automatically log the standard data
                                    provided by your web browser. It may include your device’s Internet Protocol
                                    (IP) address, your browser type and version, the pages you visit, the time and
                                    date of your visit, the time spent on each page, other details about your visit,
                                    and technical details that occur in conjunction with any errors you may
                                    encounter.
                                </p>
                                <h3 data-v-a950b0be>What Personal Information We Collect From You</h3>
                                <p className="_subtitle1" data-v-a950b0be>
                                    We may ask for personal information which may include one or more of the
                                    following:
                                    <span className="block" data-v-a950b0be>Name </span> <span className="block"
                                                                                               data-v-a950b0be>Email </span>
                                    <span className="block" data-v-a950b0be>Social media profiles ( If authorized by you )</span>
                                    <span className="block" data-v-a950b0be>Phone/mobile number</span></p>
                                <h3 data-v-a950b0be>Security of Your Personal Information</h3>
                                <p className="_subtitle1" data-v-a950b0be>
                                    When we collect and process personal information, and while we retain this
                                    information, we will protect it within commercially acceptable means to prevent
                                    loss and theft, as well as unauthorized access, disclosure, copying, use, or
                                    modification. Therefore, we generally do not share personally identifiable
                                    information (such as name, address, email or phone) with other companies.
                                </p>
                                <h3 data-v-a950b0be>Changes to This Policy</h3>
                                <p className="_subtitle1" data-v-a950b0be>
                                    At our discretion, we may change our privacy policy to reflect updates to our
                                    business processes, current acceptable practices, or legislative or regulatory
                                    changes. If we decide to change this privacy policy, we will post the changes
                                    here at the same link by which you are accessing this privacy policy.
                                </p></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default PrivacyPolicy