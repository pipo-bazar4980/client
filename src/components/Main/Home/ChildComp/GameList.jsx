import React from "react";
import "./gamelist.css"

import {
    AiOutlineLike,
    AiOutlineShareAlt,
} from "react-icons/ai";
import {Card, Row, Col, Button} from "react-bootstrap";
import {API} from '../../../../utils/config';
import {Divider} from "antd";

const GameList = ({data}) => {
    return (
        <div className="card-custom">
            <Card key={data.id} >
                <Card.Img
                    variant="top"
                    className="cart_image"
                    src={`${API}${data.images}`}
                    // height='200px'
                />

                <Card.Body >
                    <Card.Title >
                        <div className="font-semibold text-size text-center" >
                            <div>
                                {data.gameName}
                            </div>

                        </div>

                    </Card.Title>
                </Card.Body>
            </Card>
        </div>

    );
};

export default GameList;