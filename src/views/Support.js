import React, { useState, useEffect } from 'react';
import { getSupportMessage, markSupport } from '../Api/support'
import { userInfo } from '../utils/auth';
import { Button, Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { notify } from '../utils/notification';

function Support() {
    const [support, setSupport] = useState([]);
    const { token } = userInfo();

    useEffect(() => {
        getSupportMessage(token)
            .then(res => setSupport(res.data))
    }, [support])


    const markResolved = (id) =>()=> {
        markSupport(id)
            .catch(err => {
                notify('Something went wrong!')
            })
        
    }


    return (
        <>
            {support && support.map((data, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                                <p>Phone No: {data.phone}</p>
                            </Col>
                            <Col>
                                <p>requestType: {data.requestType}</p>
                                <p>Message: {data.requestDescription}</p>
                                <p>Date :{moment(data.createdAt).format('MMMM Do, YYYY, h:mm:ss a')}</p>
                            </Col>
                            <Col>
                                <div className="font-bold">Status</div>
                                {data.active === true && (<>
                                    <Button variant="danger" onClick={markResolved(data._id)}>Mark as Resolved</Button>
                                </>)}
                                {data.active === false && (<>
                                    <div style={{ color: '#01bf71',fontWeight:"bold" }}>Resolved</div>
                                </>)}
                            </Col>
                        </Row>


                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default Support;
