import React, { useEffect, useState } from "react";
import { getNotifications,editNotifications } from '../../../Api/notification'
import { userInfo } from '../../../utils/auth';
import NavBar from "../../../components/Main/Navbar/Navbar";
import Footer from "../../../components/Main/Footer";
import "./Notification.css";


const Notification = () => {
    const { token, id } = userInfo();
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        getNotifications(token, id)
            .then(res => {
                if (res.data[0]) {
                    setNotifications(res.data[0].notifications)
                }
            }
            )

    }, [notifications]);


    useEffect(() => {
        editNotifications(token,id)
    }, []);


    return (
        <>
            <NavBar />

            <section className="section-50" style={{ minHeight: "50rem" }} >
                <div className="container">
                    <h3 className="m-b-50 heading-line">Notifications <i className="fa fa-bell text-muted"/></h3>
                    {notifications && notifications.map((notification, index) => (
                        <div className="notification-ui_dd-content">
                            <div className="notification-list notification-list--unread">
                                <div className="notification-list_content">
                                    <div className="notification-list_detail">
                                        <p>{notification}</p>
                                    </div>
                                </div>
                                <div className="notification-list_feature-img">

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
            <Footer />
        </>
    )
}
export default Notification