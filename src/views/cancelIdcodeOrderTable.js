import React from 'react';
import moment from "moment";
import { BsPencilSquare } from "react-icons/bs";

const cancelIdcodeOrderTable = ({ cancelledOrdersIdCode, loading, paginatesss,makeActive,disabled }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            {cancelledOrdersIdCode && cancelledOrdersIdCode.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true && filteredData.productId?.categoryName === '(IDCode)').map((order, index) => (
                <tr>
                    <td>{(paginatesss - 1) * 10 + index + 1}</td>
                    <td>{order.orderId}</td>
                    <td>{order.userId?.userIdNo}</td>
                    <td>{order.productId?.gameName}</td>
                    <td>{order.purchaseId?.product?.option} ({order.purchaseId?.product?.price})</td>
                    <td>{order.purchaseId?.idCode} </td>
                    <td>{moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}</td>
                    <td>
                        <button className="btn btn-primary" disabled={disabled} onClick={makeActive(order._id, order.userId?._id, order.productId?.gameName, order.productId?.categoryName, order.purchaseId?.product?.option, order.purchaseId?.product?.price)}>Make Active</button>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default cancelIdcodeOrderTable;