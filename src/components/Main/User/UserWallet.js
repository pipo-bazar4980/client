import React, {useEffect, useState} from "react";
import {Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {userInfo} from '../../../utils/auth';
import {getWalletById} from '../../../Api/wallet';
import {notify} from "utils/notification";
import NavBar from "../../../components/Main/Navbar/Navbar";
import Footer from "../../../components/Main/Footer";
import {findTransactionById} from '../../../Api/addWallet';
import moment from "moment";
import Lottie from "react-lottie";
import animationData from "../../../assets/lotte/47954-wallet.json";
import "./userinfo.css"
import Pagination from './Paginate'
import Tables from "./Pagination";
import {Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const UserWallet = () => {
    const [walletInfo, setWalletInfo] = useState({});
    const [transaction, setTransaction] = useState([]);
    const {token, wallet, id} = userInfo();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        getWalletById(token, wallet)
            .then(res => setWalletInfo(res.data))
    }, [walletInfo]);

    useEffect(() => {
        setLoading(true)
        findTransactionById(token, id)
            .then(res => setTransaction(res.data))
        setLoading(false)
    }, [transaction]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transaction.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        setNumber(pageNumber)
    };

    const rowSelect = (e) => {
        setPostsPerPage(e.target.value)
    }

    let selectArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    return (
        <>
        <NavBar/>
        <Container>
            <div style={{minHeight: '50rem'}}>
                <div className="text-center">
                    <Lottie
                        options={defaultOptions}
                        width={200}
                    />
                    <div>
                        Your Wallet
                    </div>
                </div>
                <br/>
                <Card className='text-center'>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                {walletInfo.currentAmount === 0 && (<>
                                    <div>
                                        00
                                    </div>
                                </>)}
                                {walletInfo.currentAmount > 0 && (<>
                                    <div>
                                        {walletInfo.currentAmount}
                                    </div>
                                </>)}
                                <div>Available Balance</div>
                            </ListGroupItem>
                        </ListGroup>
                        <div className='d-flex  justify-content-around'>
                            <div>
                                {walletInfo.totalOrder === 0 && (<>
                                    <div>
                                        00
                                    </div>
                                </>)}
                                {walletInfo.totalOrder > 0 && (<>
                                    <div>
                                        {walletInfo.totalOrder}
                                    </div>
                                </>)}
                                <div>
                                    Total Orders
                                </div>
                            </div>
                            <div>
                                {walletInfo.spentAmount === 0 && (<>
                                    <div>
                                        00
                                    </div>
                                </>)}
                                {walletInfo.spentAmount > 0 && (<>
                                    <div>
                                        {walletInfo.spentAmount}
                                    </div>
                                </>)}
                                <div>
                                    Spend Total
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="scroll-table">
                    <TableContainer component={Paper} className="scroll-table">
                        <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Number</TableCell>
                                    <TableCell align="center">TXN ID</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Tables transaction={currentPosts} loading={loading} paginate={currentPage}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='mt-3 d-flex'>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={transaction.length}
                            paginate={paginate}
                            Number={number}
                        />
                        {transaction.length > 0 && (
                            <div className='ml-5 mt-2'>
                                <select style={{cursor: 'pointer'}} onChange={(e) => rowSelect(e)}>
                                    {selectArray.map(number => {
                                        return (
                                            <option value={number}>{number}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br/>
        </Container>
    <Footer/>
</>
)
}
export default UserWallet