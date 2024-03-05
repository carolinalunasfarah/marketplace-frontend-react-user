import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const loginWithGoogle = async (tokenId) => {
        try {
            const response = await axios.post('/auth/google', { tokenId });
            const userData = response.data.user;
            setUser(userData);
            setUserIsLoggedIn(true);
            navigate(`/mi-perfil/${userData.id_user}`);
        } catch (error) {
            console.error("Error logging in with Google:", error);
        }
    };

    const registerWithGoogle = async (tokenId) => {
        try {
            const response = await axios.post('/auth/google/register', { tokenId });
            const newUser = response.data.user;
            setUser(newUser);
            setUserIsLoggedIn(true);
            navigate(`/mi-perfil/${newUser.id_user}`);
        } catch (error) {
            console.error("Error registering with Google:", error);
        }
    };

    const loginWithEmail = async (credentials) => {
        try {
            // Validar las credenciales antes de enviar la solicitud
            if (!credentials.email || !credentials.password) {
                throw new Error("Por favor, ingresa tu correo electrónico y contraseña.");
            }
            const response = await axios.post('/auth/login', credentials);
            const userData = response.data.user;
            setUser(userData);
            setUserIsLoggedIn(true);
            navigate(`/mi-perfil/${userData.id_user}`);
        } catch (error) {
            console.error("Error logging in with email and password:", error);
        }
    };

    const registerWithEmail = async (userData) => {
        try {
            // Validar los datos del usuario antes de enviar la solicitud
            if (!userData.email || !userData.password) {
                throw new Error("Por favor, ingresa un correo electrónico y una contraseña.");
            }
            const response = await axios.post('/auth/register', userData);
            const newUser = response.data.user;
            setUser(newUser);
            setUserIsLoggedIn(true);
            navigate(`/mi-perfil/${newUser.id_user}`);
        } catch (error) {
            console.error("Error registering with email and password:", error);
        }
    };

    const logout = () => {
        setUser({});
        setUserIsLoggedIn(false);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user');
        navigate(`/`);
    };

    useEffect(() => {
        // Restore session if available
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        const storedToken = sessionStorage.getItem('access_token');
        if (storedUser && storedToken) {
            setUser(storedUser);
            setUserIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoggedIn,
                loginWithGoogle,
                registerWithGoogle,
                loginWithEmail,
                registerWithEmail,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const AuthContext = createContext();

export default AuthProvider;
