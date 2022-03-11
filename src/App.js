import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminRoute from "components/protectedRoutes/AdminRoute";
import AdminLayout from "./layouts/Admin";
import Home from "./layouts/home";
import TopUp from "./layouts/TopUp";
import Login from "./layouts/Login";
import Registration from "./layouts/Registration";
import { AuthProvider } from "./utils/auth";
import Confirmation from "./views/Confirmation";
import Confirm from "components/Main/Confirmation/Confirm";
import UserProfile from "./components/Main/User/UserProfile";
import NavBar from "./layouts/NavBar";
import UserWallet from "./components/Main/User/UserWallet";
import MyOrder from "./components/Main/User/MyOrder";
import Footer from './components/Main/Footer/index'
import Notification from './components/Main/User/Notification';
import ResetPassword from "./components/User/ResetPassword";
import ForgotPassword from "./components/User/forgotPassword";
import Support from "./components/Main/User/Support";
import TermsCondition from "./components/Main/Footer/TermsCondition";
import PrivacyPolicy from "./components/Main/Footer/PrivacyPolicy";
import ShipmentInfo from "./components/Main/Footer/ShipmentInfo";
import ReturnRefund from "./components/Main/Footer/Return&Refund";
import AboutUs from "./components/Main/Footer/AboutUs";
import PageNotFound from "./components/Main/pageNotFound";
import Search from "./components/Main/search/Search";

const App = () => {
    return (
        <AuthProvider>
            <Switch>
                {/*<Route path="/admin">*/}
                {/*    <AdminRoute path="/admin">*/}
                {/*        <AdminLayout />*/}
                {/*    </AdminRoute>*/}
                {/*</Route>*/}


                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/confirmation" component={Confirm} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/userWallet" component={UserWallet} />
                <Route exact path="/userWallet-:number" component={UserWallet} />
                <Route exact path="/myOrder" component={MyOrder} />
                <Route exact path="/myOrder-:number" component={UserWallet} />
                <Route exact path="/notification" component={Notification} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/resetPassword" component={ResetPassword} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/terms&condition" component={TermsCondition} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route exact path="/shipment-info" component={ShipmentInfo} />
                <Route exact path="/refund&return-policy" component={ReturnRefund} />
                <Route exact path="/about" component={AboutUs} />
                <Route exact path="/search-result" component={Search} />

                <Route exact path="/topUp-:productId" component={TopUp} />
                <Route exact component={PageNotFound} />


            </Switch>
        </AuthProvider>
    )
}
export default App