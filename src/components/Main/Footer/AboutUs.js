import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../Footer/index";
import "./privacy.css"

const AboutUs = () => {
    return(
        <>
            <NavBar/>
            <div className="mx-auto">
                <div>
                    <div className="container mx-auto shadow-md bg-white" data-v-3bb870a3>
                        <div className="my-3 md:flex p-3 py-6" data-v-3bb870a3>
                            <div className="content" data-v-3bb870a3><h3 data-v-3bb870a3>About Us</h3>
                                <p className="_subtitle1" data-v-3bb870a3>
                                    SELFTEN established in 2019, located in the state of Sylhet in Bangladesh. Our
                                    mainly products are game reloads, games point cards and power leveling . We
                                    provide these services at competitive price while maintaining the highest of
                                    standards.
                                </p>
                                <p className="_subtitle1" data-v-3bb870a3>
                                    We strike to make the most fun, thrilling and engaging entertainment experiences
                                    for our players. Almost all of the game point cards can be found here from local
                                    to worldwide.
                                </p>
                                <p className="_subtitle1" data-v-3bb870a3>
                                    We sell all these card with the lower price and we offer the fastest and most
                                    reliable service on the web for all your gaming needs. We strike to continue our
                                    growth by delighting more and more customer. Our customer service are always
                                    ears to your problem and complaints and we will resolve your issues as fast as
                                    possible .We believe great games start with great people . At activation, we
                                    want to make great game point cards that we sell, and we wouldn’t be able to do
                                    it without our customer .We achieve our success through our immensely talented
                                    development teams and the operational expertise of our management, marketing and
                                    corporate services.
                                </p>
                                <p className="_subtitle1" data-v-3bb870a3>
                                    We are committed in creating an enjoyable, safe and healthy environment. In so
                                    doing, we commit ourselves to contributing positively to the development of the
                                    community in which we serve and to be a good corporate citizen. We wish that you
                                    will be continue to support us and we manage to improve our service in future.
                                    Thank you for choosing SELFTEN as your gaming platform.
                                </p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-height">
                <Footer />
            </div>
        </>
    )
}
export default AboutUs