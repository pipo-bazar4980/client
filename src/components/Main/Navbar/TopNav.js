import React, { useEffect, useState } from "react";
import {
    AiFillWallet,
    AiOutlineLogout,
    AiOutlineNotification,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineWallet
} from "react-icons/ai"
import { BiSupport } from "react-icons/bi"
import { Link, Redirect, useHistory } from "react-router-dom";
import { Dropdown, FormControl } from "react-bootstrap";
import { userInfo,isAuthenticated } from '../../../utils/auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Logo from "../../../assets/img/logo.png"
import { removeJwt } from "../../../Api/user";
import { getProducts } from "../../../Api";
import Search from "../search/Search";
import { deleteAllProduct, updateUserActiveStatus } from "../../../Api/user";
import { Drawer, Button } from 'antd';
import "./topnav.css"
import { getNotifications } from '../../../Api/notification'

const TopNav = () => {
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [viewNotifications, setViewNotifications] = useState([]);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const history = useHistory();
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            &#x25bc;
        </a>
    ));

    const [searchBar, setSearchBar] = useState({
        product: ''
    })
    const { product } = searchBar

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((res) => {
                let allData = res.data
                setProducts(allData)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);


    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );


    const handleSearch = e => {
        e.preventDefault()
    }

    function setSearchItem(e) {
        setSearchBar({
            ...searchBar,
            [e.target.name]: e.target.value,
        })
       
    }

    let result

    let redirect = false

    const filterContent = (e) => {
        let searchTerm = product
        result = products.filter((order) =>
            order.gameName && order.gameName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            order.categoryName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

        history.push({
            pathname: '/search-result',
            state: result
        });
    }

    const logout = (e) => {
        e.preventDefault()
        removeJwt()
        updateUserActiveStatus('inActive')
        deleteAllProduct()
        localStorage.clear()
    }

    useEffect(() => {
        if (isAuthenticated()) {
            const { token, id } = userInfo();
            getNotifications(token, id)
                .then(res => {
                    if (res.data[0]) {
                        setNotifications(res.data[0].notifications)
                        setViewNotifications(res.data[0].view)
                    }
                })
        }

    }, []);

    const dropDown = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} >
                    <Avatar icon={<UserOutlined />} />
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>

                    <Dropdown.Item as={Link} to='/profile' eventKey="1"><Link
                        to='profile'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiOutlineUser /></div>
                            <div className="ml-2"> My Profile</div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='userWallet' eventKey="2"><Link
                        to='userWallet'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiOutlineWallet /></div>
                            <div className="ml-2"> My Wallet</div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='notification' eventKey="2"><Link
                        to='notification'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiOutlineNotification />
                            </div>
                            <div className="ml-2">notification
                                {viewNotifications === false && <>
                                    <i className="fas fa-circle" style={{fontSize: ".5rem", color: "blue"}}/>
                                </>}

                            </div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='confirmation' eventKey="3"><Link
                        to='confirmation'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiFillWallet /></div>
                            <div className="ml-2">Add Wallet</div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='myOrder' eventKey="4"><Link
                        to='myOrder'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiOutlineShoppingCart />
                            </div>
                            <div className="ml-2">My Order</div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='support' eventKey="5"><Link
                        to='support'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><BiSupport /></div>
                            <div className="ml-2">Support</div>
                        </div>
                    </Link></Dropdown.Item>
                    <Dropdown.Item as={Link} to='/' eventKey="6" onClick={logout}><Link
                        to='/'>
                        <div className="d-flex">
                            <div style={{ marginTop: '2px' }}><AiOutlineLogout /></div>
                            <div className="ml-2">Logout</div>
                        </div>
                    </Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    return (
        <>
            <div data-v-70c6da4e data-v-791b20d9>
                {redirect && <Redirect to='/search-result'
                ><Search data={result} /></Redirect>}
                <header  className="bg-white md:bg-white md:pb-0 md:mb-0 sticky top-0 left-0 w-full z-[9999999]"
                    data-v-70c6da4e>

                    <div className="container mx-auto" data-v-70c6da4e>
                        <div className="flex items-center py-2 justify-between" data-v-70c6da4e>
                            <div className="w-[130px] md:w-[160px]" data-v-70c6da4e><Link to='/'
                                className="nuxt-link-active"
                                data-v-70c6da4e><img
                                    src={Logo} alt="Sizishop"
                                    className="md:block max-w-full h-auto object-cover" data-v-70c6da4e/></Link>
                            </div>
                            <div className="flex-grow px-12 hidden md:block" data-v-70c6da4e>
                                <div className="w-full" data-v-70c6da4e>
                                    <form data-v-70c6da4e onSubmit={handleSearch}>
                                        <div className="relative overflow-hidden" data-v-70c6da4e>
                                            <input type="text"
                                                placeholder="Search.."
                                                className="w-full border-[3px] border-primary-500 rounded text-lg text-gray-800 font-normal py-1.5 px-4 pr-[110px] focus:outline-none focus:border-primary-300"
                                                data-v-70c6da4e name="product" value={product}
                                                onChange={(e) => setSearchItem(e)} />
                                            <input type="submit" value="Search"
                                                className="absolute top-1/2 right-[2px] -translate-y-1/2 w-[100px] bg-primary-500 duration-100 hover:bg-primary-400 flex items-center  justify-center text-white font-normal text-lg cursor-pointer abc "
                                                data-v-70c6da4e onClick={e => filterContent(e)} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div data-v-70c6da4e>
                                <ul className="flex flex-nowrap items-center header_top_right_ul" data-v-70c6da4e>
                                    {!isAuthenticated() && (<>
                                        <li className="hidden xs:block" data-v-70c6da4e>
                                            <Link to='/login' aria-current="page" data-v-70c6da4e>Login </Link>
                                        </li>
                                        <li data-v-70c6da4e><Link to='/registration' data-v-70c6da4e>Sign Up </Link>
                                        </li>
                                    </>)}
                                    {isAuthenticated() && (
                                        <li>
                                            <div className="m-dropdown">
                                                {dropDown()}
                                                <div className="text-white mr-4">hello</div>
                                            </div>
                                            <div className="m-drawer textsize">
                                                <Button type="primary" onClick={showDrawer}>
                                                    Menu
                                                </Button>
                                                <Drawer style={{ marginTop: "60px" }} title="Menu" placement="right"
                                                    onClose={onClose} visible={visible}>
                                                    <div className="font-semibold" >
                                                        <div as={Link} to='/profile' eventKey="1"><Link
                                                            to='profile'>
                                                            <div className="d-flex  m-2">
                                                                <div className="textsize" style={{ marginTop: '5px' }}><AiOutlineUser /></div>
                                                                <div className="ml-2 textsize"> My Profile</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='userWallet' eventKey="2"><Link
                                                            to='userWallet'>
                                                            <div className="d-flex  textsize m-2">
                                                                <div style={{ marginTop: '5px' }}><AiOutlineWallet /></div>
                                                                <div className="ml-2"> My Wallet</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='notification' eventKey="2"><Link
                                                            to='notification'>
                                                            <div className="d-flex  m-2 textsize">
                                                                <div style={{ marginTop: '5px' }}><AiOutlineNotification />
                                                                </div>
                                                                <div className="ml-2">Notification</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='confirmation' eventKey="3"><Link
                                                            to='confirmation'>
                                                            <div className="d-flex  m-2 textsize">
                                                                <div style={{ marginTop: '5px' }}><AiFillWallet /></div>
                                                                <div className="ml-2">Add Wallet</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='myOrder' eventKey="4"><Link
                                                            to='myOrder'>
                                                            <div className="d-flex m-2 textsize">
                                                                <div style={{ marginTop: '5px' }}><AiOutlineShoppingCart />
                                                                </div>
                                                                <div className="ml-2">My Order</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='support' eventKey="5"><Link
                                                            to='support'>
                                                            <div className="d-flex  m-2 textsize">
                                                                <div style={{ marginTop: '5px' }}><BiSupport /></div>
                                                                <div className="ml-2">Support</div>
                                                            </div>
                                                        </Link></div>
                                                        <div as={Link} to='/' eventKey="6" onClick={logout}><Link
                                                            to='/'>
                                                            <div className="d-flex m-2 textsize">
                                                                <div style={{ marginTop: '5px' }}><AiOutlineLogout /></div>
                                                                <div className="ml-2">Logout</div>
                                                            </div>
                                                        </Link></div>
                                                    </div>

                                                </Drawer>
                                            </div>
                                        </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default TopNav