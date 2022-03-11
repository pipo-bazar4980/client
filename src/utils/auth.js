 import jwt_decode from 'jwt-decode';
import {createContext, useReducer} from "react";

export const authenticate = (token, cb) => {

    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(token));
        cb();
    }
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('jwt')) { 
        const { exp } = jwt_decode(JSON.parse(localStorage.getItem('jwt'))); 
        if((new Date()).getTime() < exp * 1000){
            return true;
        }else{
            localStorage.removeItem('jwt');
            return false
        }
        
    } else return false;
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const decoded = jwt_decode(jwt);
    return { ...decoded, token: jwt }
}


const initialstate = {
    user: null,
};
if (localStorage.getItem("JWT_Token")) {
    const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("JWT_Token"));
    console.log(jwt_Token_decoded.exp * 1000);
    console.log(Date.now());
    if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.clear(); // this runs only when I refresh the page or reload on route change it dosent work
    } else {
        initialstate.user = jwt_Token_decoded;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialstate);
    const login = (userData) => {
        localStorage.setItem("JWT_Token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
    };
    const logout = () => {
        localStorage.clear();
        dispatch({ action: "LOGOUT" });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

export {AuthContext};