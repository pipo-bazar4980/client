import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { findAllBanner } from '../../../Api/utility';
import { API } from '../../../utils/config';
import "./carosel.css"

const Carousol = () => {
    const [index, setIndex] = useState(0);
    const [banners, setBanners] = useState([]);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        findAllBanner()
            .then(response => setBanners(response.data))
    }, [])


    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {banners && banners.map((banner, index) => {
                if (banner.disabled === false) {
                    return (
                            <Carousel.Item>

                                <a href={banner.link} target="_blank" rel="noopener noreferrer" >
                                    <img
                                        className="d-block w-100 banner-height"
                                        src={`${API}${banner.image}`}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>{banner.firstTitle}</h3>
                                        <p>{banner.secondTitle}</p>
                                    </Carousel.Caption>
                                </a>
                            </Carousel.Item>
                    )
                }
            })}

        </Carousel>
    );
}
export default Carousol