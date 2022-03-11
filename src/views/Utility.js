import React,{useEffect} from "react";
import CarouselComp from "../components/Utility/CarosolComp";
import Instruction from "../components/Utility/Instraction/PaymentMethod";
import PaymentMethodData from "../components/Utility/Instraction/PaymentMethodData";
import Popupbanner from "../components/Utility/PopupBanner/Popupbanner";

const Utility  = () => {

    return(
        <>
            <div>Banners</div>
            <CarouselComp/>
            <div>Instruction</div>
            <Instruction/>
            <PaymentMethodData/>
            <Popupbanner/>
        </>
    )
}

export default Utility