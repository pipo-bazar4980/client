import React from 'react';
import moment from "moment";
import {TableCell, TableRow} from "@mui/material";

const Tables = ({ transaction, loading, paginate }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            {transaction && transaction.map((data, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center">
                        {data.amount}
                    </TableCell>
                    <TableCell align="center">{data.mobileNumber}</TableCell>
                    <TableCell align="center">{data.transactionID}</TableCell>
                    {data.isComplete === true && (<>
                        <TableCell align="center" style={{ color: "green" }}>Complete</TableCell>
                    </>)}
                    {data.isComplete === false && data.reject === false && (<>
                        <TableCell align="center" style={{ color: "blue" }}>Pending</TableCell>
                    </>)}
                    {data.reject === true && (<>
                        <TableCell align="center" style={{ color: "red" }}>Canceled <span style={{ color: "black" }}>( {data.rejectReason} )</span></TableCell>
                    </>)}
                    <TableCell align="center">{moment(data.createdAt).format('DD-MM-YYYY, h:mm a')}</TableCell>
                </TableRow>

                   // <tr key={index}>
                   // <td>{(paginate - 1) * 10 + index + 1}</td>
                   //      <td>{moment(data.createdAt).format('DD-MM-YYYY, h:mm a')}</td>
                   //      {/*<td>{data.paymentType}</td>*/}
                   //      <td>{data.transactionID}</td>
                   //      <td>{data.amount}</td>
                   //      {/*<td>{data.mobileNumber}</td>*/}
                   //      {data.isComplete === true && (<>
                   //          <td style={{ color: "green" }}>Complete</td>
                   //      </>)}
                   //      {data.isComplete === false && data.reject === false && (<>
                   //          <td style={{ color: "blue" }}>Pending</td>
                   //      </>)}
                   //      {data.reject === true && (<>
                   //          <td style={{ color: "red" }}>Canceled <span style={{ color: "black" }}>( {data.rejectReason} )</span></td>
                   //      </>)}
                   //  </tr>
                )
            )}
        </>
    );
};

export default Tables;