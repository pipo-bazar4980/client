import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert'
import Logo from "../../../assets/img/logo.png"
import {Dropdown} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {
    AiFillWallet, AiOutlineLogout,
    AiOutlineNotification,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineWallet
} from "react-icons/ai";
import {BiSupport} from "react-icons/bi";
import {useEffect, useState} from "react";
import {isAuthenticated, userInfo} from "../../../utils/auth";
import {getNotifications} from "../../../Api/notification";
import {deleteAllProduct, removeJwt, updateUserActiveStatus} from "../../../Api/user";
import {Button} from "@mui/material";
import {getProducts} from "../../../Api";
import {useHistory} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [viewNotifications, setViewNotifications] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (isAuthenticated()) {
            const {token, id} = userInfo();
            getNotifications(token, id)
                .then(res => {
                    if (res.data[0]) {
                        setNotifications(res.data[0].notifications)
                        setViewNotifications(res.data[0].view)
                    }
                })
        }

    }, []);

    const logout = (e) => {
        e.preventDefault()
        removeJwt()
        updateUserActiveStatus('inActive')
        deleteAllProduct()
        handleMenuClose()
        localStorage.clear()
        history.push({
            pathname: '/'
        });
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem as={Link} to='/profile' eventKey="1" onClick={handleMenuClose}><Link
                to='profile'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiOutlineUser/></div>
                    <div className="ml-2"> My Profile</div>
                </div>
            </Link></MenuItem>
            <MenuItem as={Link} to='userWallet' eventKey="2" onClick={handleMenuClose}><Link
                to='userWallet'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiOutlineWallet/></div>
                    <div className="ml-2"> My Wallet</div>
                </div>
            </Link></MenuItem>
            <MenuItem onClick={handleMenuClose} as={Link} to='notification' eventKey="2"><Link
                to='notification'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiOutlineNotification/>
                    </div>
                    <div className="ml-2">Notification
                        {viewNotifications === false && <>
                            <i className="fas fa-circle" style={{fontSize: ".5rem", color: "blue"}}/>
                        </>}

                    </div>
                </div>
            </Link></MenuItem>
            <MenuItem onClick={handleMenuClose} as={Link} to='confirmation' eventKey="3"><Link
                to='confirmation'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiFillWallet/></div>
                    <div className="ml-2">Add Wallet</div>
                </div>
            </Link></MenuItem>
            <MenuItem onClick={handleMenuClose} as={Link} to='myOrder' eventKey="4"><Link
                to='myOrder'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiOutlineShoppingCart/>
                    </div>
                    <div className="ml-2">My Order</div>
                </div>
            </Link></MenuItem>
            <MenuItem onClick={handleMenuClose} as={Link} to='support' eventKey="5"><Link
                to='support'>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><BiSupport/></div>
                    <div className="ml-2">Support</div>
                </div>
            </Link></MenuItem>
            <MenuItem as={Link} to='/' eventKey="6" onClick={handleMenuClose}><Link
                to='/' onClick={logout}>
                <div className="d-flex">
                    <div style={{marginTop: '2px'}}><AiOutlineLogout/></div>
                    <div className="ml-2">Logout</div>
                </div>
            </Link></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

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

    const [searchBar, setSearchBar] = useState({
        product: ''
    })
    const [products, setProducts] = useState([])
    const {product} = searchBar

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
    const history = useHistory();
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

    return (
        <Box sx={{flexGrow: 1}}>
            {redirect && <Redirect to='/search-result'
            ><Search data={result}/></Redirect>}
            <AppBar position="static" style={{backgroundColor: '#fff'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2, flexGrow:.1}}
                        as={Link} to='/'
                    >
                        <img src={Logo} alt='ads' width='100px'/>
                    </IconButton>
                    <Box sx={{flexGrow: 1}} className=" px-12 hidden md:block">
                        <Box className="w-full" sx={{flexGrow: 1}}>
                            <form onSubmit={handleSearch}>
                                <div className="relative overflow-hidden">
                                    <input type="text"
                                           style={{borderColor: "white"}}
                                           placeholder="Search.."
                                           style={{ border: '3px solid #299078'}}
                                           className="w-full border-[3px] rounded text-lg text-gray-800 font-normal py-1.5 px-4 pr-[110px] focus:outline-none"
                                           name="product" value={product}
                                           onChange={(e) => setSearchItem(e)}/>
                                    <input type="submit" value="Search"
                                           style={{backgroundColor: '#299078', border: '2px solid #299078'}}
                                           className="absolute top-1/2 right-[2px] -translate-y-1/2 w-[100px]  duration-100  flex items-center  justify-center text-white font-normal text-lg cursor-pointer abc "
                                           onClick={e => filterContent(e)}
                                    />
                                </div>
                            </form>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, flexGrow: .05}}>
                        {!isAuthenticated() && (<Box style={{position: "relative", right: '0%'}}>
                            <Button
                                style={{color: '#299078', borderColor: "#299078", padding: 5, fontSize: 15, marginLeft: 50}}
                                color="success" variant="outlined"> <Link to='/login' aria-current="page"
                                                                          data-v-70c6da4e>Login </Link></Button>
                            <Button
                                style={{color: '#299078', borderColor: "#299078", padding: 5, fontSize: 15, marginLeft: 20}}
                                color="success" variant="outlined"> <Link to='/registration' data-v-70c6da4e>Sign
                                Up </Link></Button>
                        </Box>)}
                        {isAuthenticated() && (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                style={{color: '#299078'}}
                            >
                                <AccountCircle style={{color: '#299078'}}/>
                            </IconButton>
                        )}


                    </Box>

                    <Box sx={{display: {xs: 'flex', md: 'none'}, flexGrow: 1}}>
                        {!isAuthenticated() && (<Box style={{position: "relative", right: '0%'}}>
                            <Button
                                style={{color: '#299078', borderColor: "#299078", padding: 5, fontSize: 15, marginLeft: 50}}
                                color="success" variant="outlined"> <Link to='/login' aria-current="page"
                                                                          data-v-70c6da4e>Login </Link></Button>
                            <Button
                                style={{color: '#299078', borderColor: "#299078", padding: 5, fontSize: 15, marginLeft: 20}}
                                color="success" variant="outlined"> <Link to='/registration' data-v-70c6da4e>Sign
                                Up </Link></Button>
                        </Box>)}
                        {isAuthenticated() && (

                                <IconButton
                                    sx={{flexGrow: 1}}
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    style={{color: '#299078', paddingLeft: 150}}
                                >
                                    <AccountCircle  style={{color: '#299078'}}/>
                                </IconButton>

                        )}

                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}