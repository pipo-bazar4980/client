import React, { useEffect, useState } from 'react';
import moment from "moment";
import { userInfo } from '../utils/auth';
import { createNotifications } from '../Api/notification';
import { updateAddWallet } from '../Api/addWallet';
import { notify } from '../utils/notification';

const CancelPurchacheTable = ({ cancelledPayment, loading, paginatess,findActivePayment,findCancelledPayment }) => {
    const { token, id } = userInfo();
    if (loading) {
        return <h2>Loading...</h2>;
    }

    const [disabledButton, setDisabledButton] = useState({
        disabled: false,
    });

    const { disabled } = disabledButton

    const makeActive = (tranId, userId, transactionID) => () => {
        setDisabledButton({
            disabled: true
        })
        let data = {
            reject: false,
            rejectReason: null
        }
        updateAddWallet(token, tranId, data)
            .then(res => {
                console.log("hello")
                createNotifications(token, userId, `Your transaction has been reactive for TransactionId:${transactionID}`)
                    .then(res => {
                        notify('Transaction reactive successfully!')
                        findCancelledPayment()
                        findActivePayment()
                        setTimeout(reloadPage, 3000)
                    })
                    .catch(res => {
                        setDisabledButton({
                            disabled: false
                        })
                    })
            })
            .catch(res => {
                notify('Something wrong! Please try again')
                setDisabledButton({
                    disabled: false
                })
            })
    }

    const reloadPage = () => {
        setDisabledButton({
            disabled: false
        })
        window.location.reload(false)
    }
    return (
        <>
            {cancelledPayment && cancelledPayment.filter(filteredData => filteredData.isComplete === false && filteredData.reject === true).map((item, index) => (
                <tr>
                    <td>{(paginatess - 1) * 10 + index + 1}</td>
                    <td>{item.userId?.userIdNo}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.transactionID}</td>
                    <td>{item.mobileNumber}</td>
                    <td>{item.amount}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY, h:mm a')}</td>
                    <td>{item.rejectReason}</td>
                    <td>
                        <button className="btn btn-primary" disabled={disabled} onClick={makeActive(item._id, item.userId?._id, item.transactionID)}>Make Active</button>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default CancelPurchacheTable;