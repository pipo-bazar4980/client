import React from 'react';
import moment from "moment";
import {BsPencilSquare} from "react-icons/bs";

const OrderTables = ({completePayment, loading,  paginate }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            {completePayment && completePayment.filter(filteredData => filteredData.isComplete === true).map((item, index) => (
                <tr>
                    <td>{(paginate-1)*10+ index + 1}</td>
                    <td>{item.userId?.userIdNo}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.transactionID}</td>
                    <td>{item.mobileNumber}</td>
                    <td>{item.amount}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY, h:mm a')}</td>
                </tr>
            ))}
        </>
    );
};

export default OrderTables;