import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [redirectPath, setRedirectPath] = useState(null);

    const urlBaseServer = Config.get("URL_API");
    const url_users = urlBaseServer + "users";
    const url_login = urlBaseServer + "login";
    const url_loginWithGoogle = urlBaseServer + "loginWithGoogle";

    const [user, setUser] = useState({});
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const accessWithGoogle = async (tokenId, isLogin) => {
        try {
            let response;
            if (isLogin) {
                response = await axios.get(`${urlBaseServer}auth/google`);
            } else {
                response = await axios.get(
                    `${urlBaseServer}auth/google/callback`
                );
            }
            const { token } = response.data;
            handleLoginResponse(token);
        } catch (error) {
            console.error(
                `Error ${isLogin ? "logging in" : "registering"} with Google:`,
                error
            );
        }
    };

    const handleLoginResponse = (token) => {
        if (!token) {
            throw new Error("Invalid response from server");
        }
        const decodedToken = jwtDecode(token);
        const id_user = decodedToken.id_user;
        setUserIsLoggedIn(true);
        sessionStorage.setItem("access_token", token);
        // Redirigir al perfil del usuario
        window.location.href = `${urlBaseServer}mi-perfil/${id_user}`;
    };

    const loginWithEmail = async (credentials) => {
        try {
            // Validar las credenciales antes de enviar la solicitud
            if (!credentials.email || !credentials.password) {
                throw new Error(
                    "Por favor, ingresa tu correo electrónico y contraseña."
                );
            }

            const response = await axios.post(url_login, credentials);
            const token = response.data;
            const decodedToken = jwtDecode(token.token);

            const user = await axios.get(`${url_users}/${decodedToken.id_user}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                }
            });

            setUser(user.data);
            setUserIsLoggedIn(true);

            sessionStorage.setItem("access_token", token.token);
            sessionStorage.setItem("user", JSON.stringify(user.data));
            handlePostLoginRedirect();
        } catch (error) {
            console.error("Error logging in with email and password:", error);
            throw new Error("Email y/o contraseña incorrecta.");
        }
    };

    const loginWithGoogle = async (credentials) => {
        try {
            if (!credentials) {
                throw new Error(
                    "Error al iniciar sesión con Google."
                );
            }

            const response = await axios.post(url_loginWithGoogle, null, {
                headers: {
                    Authorization: `Bearer ${credentials}`,
                }
            });
            const token = response.data;
            const decodedToken = jwtDecode(token.token);

            const user = await axios.get(`${url_users}/${decodedToken.id_user}`, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                }
            });

            setUser(user.data);
            setUserIsLoggedIn(true);

            sessionStorage.setItem("access_token", token.token);
            sessionStorage.setItem("user", JSON.stringify(user.data));
            handlePostLoginRedirect();
        } catch (error) {
            console.error("Error logging in with email and password:", error);
            throw new Error("Email y/o contraseña incorrecta.");
        }
    };

    const handlePostLoginRedirect = () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        navigate(redirectPath || `/mi-perfil/${user.id_user}`);
        setRedirectPath(null); // Limpiar la ruta de redirección después de usarla
    };

    const setRedirectAfterLogin = (path) => {
        setRedirectPath(path);
    };

    const registerWithEmail = async (userData) => {
        try {
            // Validar los datos del usuario antes de enviar la solicitud
            if (!userData.email || !userData.password) {
                throw new Error(
                    "Por favor, ingresa un correo electrónico y una contraseña."
                );
            }
            const response = await axios.post(url_users, userData);
            const newUser = response.data;
            setUser(newUser);
            setUserIsLoggedIn(true);
            navigate("/inicia-sesion");
        } catch (error) {
            console.error("Error registering with email and password:", error);
        }
    };

    const logout = () => {
        setUser({});
        setUserIsLoggedIn(false);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
        navigate(`/`);
    };

    // useEffect(() => {
    //     // Restore session if available
    //     const storedUser = JSON.parse(sessionStorage.getItem("user"));
    //     const storedToken = sessionStorage.getItem("access_token");
    //     if (storedUser && storedToken) {
    //         setUser(storedUser);
    //         setUserIsLoggedIn(true);
    //     }
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoggedIn,
                setUserIsLoggedIn,
                accessWithGoogle,
                loginWithEmail, loginWithGoogle,
                registerWithEmail,
                logout,
                setRedirectAfterLogin,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext();

export default AuthProvider;
