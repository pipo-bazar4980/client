import React from 'react';
import moment from "moment";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const OrderTables = ({ myOrders, loading, paginate }) => {

    return (
        <>
            {myOrders && myOrders.map((order, index) => (
                <tr key={index}>
                    <Card sx={{ minWidth: 275, mt: 2 }}>
                        <Grid container>
                            <Grid item sm={11}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14,  }} color="text.secondary" gutterBottom>
                                        <span style={{fontWeight: 'bold'}}>Order ID : </span>{order.orderId}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        <span style={{fontWeight: 'bold'}}>Product Name : </span> {order.productId?.gameName}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                                        <span style={{fontWeight: 'bold'}}> Date of order : </span>{moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}
                                    </Typography>
                                    <Typography variant="body2">
                                        <span style={{fontWeight: 'bold'}}>Package Name : </span>{order.purchaseId?.product?.option}
                                    </Typography >
                                    <Typography variant="body2">
                                        <span style={{fontWeight: 'bold'}}>Price : </span>{order.purchaseId?.product?.price} Taka
                                    </Typography>
                                    <Typography>
                                        {order.reject === true && (<>
                                            <Box style={{ color: "red" }}>Canceled <span style={{ color: "black" }}>( {order.rejectReason} )</span></Box>
                                        </>)}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item sm={1} sx={{mt:2}}>
                                {order.isComplete === true && order.reject === false && (<>
                                    <Box style={{ color: "green" }}>Complete</Box>
                                </>)}
                                {order.isComplete === false && order.reject === false && (<>
                                    <Box style={{ color: "blue" }}>Pending</Box>
                                </>)}
                            </Grid>
                        </Grid>

                    </Card>
                    {/*<td>{(paginate - 1) * 10 + index + 1}</td>*/}
                    {/*<td>{order.orderId}</td>*/}
                    {/*<td>{moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}</td>*/}
                    {/*<td>{order.productId?.gameName}</td>*/}
                    {/*<td>{order.purchaseId?.product?.option} <span style={{ marginLeft: "10px" }}>{order.purchaseId?.product?.price} Taka</span></td>*/}
                    {/*{order.isComplete === true && order.reject === false && (<>*/}
                    {/*    <td style={{ color: "green" }}>Complete</td>*/}
                    {/*</>)}*/}
                    {/*{order.isComplete === false && order.reject === false && (<>*/}
                    {/*    <td style={{ color: "blue" }}>Pending</td>*/}
                    {/*</>)}*/}
                    {/*{order.reject === true && (<>*/}
                    {/*    <td style={{ color: "red" }}>Canceled <span style={{ color: "black" }}>( {order.rejectReason} )</span></td>*/}
                    {/*</>)}*/}
                </tr>
            ))}
        </>
    );
};

export default OrderTables;