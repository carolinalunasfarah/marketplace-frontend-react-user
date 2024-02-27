import { createContext, useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({});    
    const [user, setUser] = useState({});
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const login = (credentials) => {
        console.log("Auth::login()")

        if (!credentials.email || !credentials.password) {
            console.log("Error: credentials");
            return false;
        }

        //store credentials for future token requests
        setCredentials(credentials);

        //request token
        if (!requestAccessToken()) {
            console.log("Error: requestAccessToken");
            return false;
        }

        //request user data
        if (!requestUser()) {
            console.log("Error: requestUser");
            return false;
        }

        setUser(getUser());
        setUserIsLoggedIn(true);

        //redirect to dashboard
        navigate(`/mi-perfil/${getUser("id_user")}`);

        return true;
    };

    const requestAccessToken = () => {
        /*
        axios POST login with credentials (email and password) - returns access_token or false
        */
        const access_token = {
            access_token : "1234",
            expiresIn : 600,
            expirationDate : "2025-02-27 05:21:43"
        };

        sessionStorage.setItem('access_token', JSON.stringify(access_token));

        return access_token;
    };

    const getAccessToken = (attr) => {
        try {
            const access_token = JSON.parse(sessionStorage.getItem('access_token'));

            if (attr) {
                return access_token?.[attr] || null;
            }

            return access_token;
        } catch (error) {
            sessionStorage.removeItem('access_token');
            return false;
        }
    };
        
    const requestUser = () => {
        //axios GET user with Bearer getAccessToken("access_token") - returns user or false
        
        const user =  { //sólo datos no sensibles, estarán en sesión
            "id_user": 1,
            "role": "registered",
            "firstname": "Benja",
            "lastname": "Min",
            "email": "user1@example.com",
            //"password": "password1",
            "address": "",
            "phone": "",
            "avatar_url": "https://avatars.githubusercontent.com/u/13787527",
            "id_user_google": "",
            "date_add": "2024-02-24 00:24:42",
            "date_upd": ""
        };

        sessionStorage.setItem('user', JSON.stringify(user));

        return user;
    };

    const getUser = (attr) => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));

            if (attr) {
                return user?.[attr] || null;
            }

            return user;
        } catch (error) {
            sessionStorage.removeItem('user');
            return false;
        }
    };

    const checkAuthentication = () => {
        console.log("Auth::checkAuthentication()");
        
        if (getUser() && isAccessTokenValid()) {
            console.log("Session restore");
            return true;
        }

        //credentials required to request a token
        if (!credentials.email || !credentials.password) {
            console.log("No Credentials");
            logout();
            return false;
        }

        requestAccessToken();

        if (!getAccessToken()) {
            console.log("Error getting a new access_token");
            logout();
            return false;
        }

        return true;
    };

    const isAccessTokenValid = () => {
        if (getAccessToken() && 
            (new Date(new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')) <= new Date(getAccessToken("expirationDate")))) {
            return true; 
        }
        
        return false;
    };

    const logout = () => {
        console.log("Auth::logout()");
        setCredentials({});

        setUser({});
        sessionStorage.removeItem('user');

        setUserIsLoggedIn(false);
        sessionStorage.removeItem('access_token');
        
        navigate(`/`);
    };

    useEffect(() => {
        //restore session if is available
        setUser(getUser());
        setUserIsLoggedIn(getUser() && getAccessToken() ? true : false);
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoggedIn,
                login, checkAuthentication, logout
            }}>
            {children}
        </AuthContext.Provider>
      );
};
    
export const AuthContext = createContext();
export default AuthProvider;
