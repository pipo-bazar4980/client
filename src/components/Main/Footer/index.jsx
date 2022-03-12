import React from 'react'
import "./index.css"
import {animateScroll as scroll} from 'react-scroll';
import {Link} from "react-router-dom";
import {AiOutlinePhone, AiOutlineYoutube, AiOutlineInstagram} from 'react-icons/ai';
import {FaFacebookF} from 'react-icons/fa';


const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (<>
            <footer style={{backgroundColor : '#299078'}} className="pt-10" data-v-5b0427c1 data-v-791b20d9>
                <div className="container md:!px-0" data-v-5b0427c1>
                    <div className="grid grid-cols-1 md:justify-start md:grid-cols-[22%,auto,25%] gap-12"
                         data-v-5b0427c1>
                        <div data-v-5b0427c1>
                            <h3 className="title" data-v-5b0427c1>Support</h3> <a href="#" target="_blank"
                                                                                  data-v-5b0427c1>
                            <div className="contact_box mb-4" data-v-5b0427c1>
                                <div
                                    className="flex text-white items-center justify-center flex-shrink-0 px-4 py-3 border-r border-white border-opacity-25"
                                    data-v-5b0427c1>
                                    < AiOutlinePhone className="logo-size"/>
                                </div>
                                <div className="px-5 py-2.5" data-v-5b0427c1>
                                    <p className="text-white text-opacity-70 text-xs" data-v-5b0427c1>9AM - 10PM</p>
                                    <p className="text-xl font-medium text-white mt-1" data-v-5b0427c1>01712345678
                                    </p>
                                </div>
                            </div>
                        </a> <a href="#" target="_blank" data-v-5b0427c1>
                            <div className="contact_box mb-4" data-v-5b0427c1>
                                <div
                                    className="flex text-white items-center justify-center flex-shrink-0 px-4 py-3 border-r border-white border-opacity-25"
                                    data-v-5b0427c1>
                                    < AiOutlinePhone className="logo-size"/>
                                </div>
                                <div className="px-5 py-2.5" data-v-5b0427c1>
                                    <p className="text-white text-opacity-70 text-xs" data-v-5b0427c1>9AM - 10PM</p>
                                    <p className="text-xl font-medium text-white mt-1" data-v-5b0427c1>01712345678
                                    </p>
                                </div>
                            </div>
                        </a>
                        </div>
                        <div data-v-5b0427c1>
                            <h3 className="title" data-v-5b0427c1>About</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-5b0427c1>
                                <div data-v-5b0427c1>
                                    <Link to='terms&condition' className="link nuxt-link-active" data-v-5b0427c1> Terms
                                        & Condition</Link>
                                    <Link to="privacy-policy" className="link nuxt-link-active" data-v-5b0427c1>Privacy
                                        Policy</Link>
                                    <Link to="shipment-info" className="link nuxt-link-active" data-v-5b0427c1>Shipment
                                        Info</Link>
                                    <Link to="refund&return-policy" className="link nuxt-link-active" data-v-5b0427c1>Refund
                                        & Return Policy</Link>


                                </div>
                                <div data-v-5b0427c1>
                                    <Link to='support' className="link nuxt-link-active"
                                                           data-v-5b0427c1>
                                    Contact
                                </Link>
                                    <Link to='about' className="link nuxt-link-active"
                                              data-v-5b0427c1>
                                    About
                                </Link></div>
                                <div data-v-5b0427c1><Link to='/' className="link nuxt-link-active" data-v-5b0427c1>
                                    Home
                                </Link></div>
                            </div>
                        </div>
                        <div className="text-centers" data-v-5b0427c1>
                            <div className="title" data-v-5b0427c1>Stay connected</div>
                            <p className="text-white font-semibold mb-1.5 text-sm" data-v-5b0427c1>
                                Bengal Software
                            </p> <span className="text-white text-opacity-70 text-sm " data-v-5b0427c1>
                                    2th floor, Adept K.R. Complex, Beside Jamuna Future Park, Bashundhara R/A, Main Gate, Dhaka
                                </span>
                            <p className="text-white text-opacity-70 text-sm mt-2 mb-1.5" data-v-5b0427c1>Email:</p>
                            <p className="text-white font-semibold mb-1.5 text-sm" data-v-5b0427c1><a
                                href="mailto:email@gmail.com" data-v-5b0427c1>email@gmail.com</a></p>
                            <div className="flex items-center justify-center md:justify-start mt-5 space-x-4"
                                 data-v-5b0427c1><a href="#" data-v-5b0427c1>
                                <div
                                    className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center p-2 bg-white bg-opacity-30 hover:bg-opacity-60" 
                                    data-v-5b0427c1>
                                        <FaFacebookF className="abc" style={{color:"#299078"}}/>
                                </div>
                            </a> <a href="#" data-v-5b0427c1>
                                <div
                                    className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center p-2 bg-white bg-opacity-30 hover:bg-opacity-60"
                                    data-v-5b0427c1>
                                    <AiOutlineYoutube className="abc" style={{color:"#299078"}}/>
                                </div>
                            </a> <a href="#" data-v-5b0427c1>
                                <div
                                    className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center p-2 bg-white bg-opacity-30 hover:bg-opacity-60"
                                    data-v-5b0427c1 style={{cursor: 'pointer'}}>
                                    <AiOutlineInstagram className="abc" style={{color:"#299078"}}/>
                                </div>
                            </a></div>
                        </div>
                    </div>
                    <div
                        className="border-white border-opacity-25 border-t py-6 flex justify-center flex-wrap md:flex-nowrap md:justify-between mt-8"
                        data-v-5b0427c1>
                        <p className="text-white text-opacity-70 text-xs mb-1.5 md:mb-0" data-v-5b0427c1>
                            © 2021 Bengal Software | All rights reserved
                        </p> <a href="index.html" className="text-sm text-white nuxt-link-active"
                                data-v-5b0427c1>Pipo Bazar</a>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
