import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from 'jwt-decode'

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

// notifications
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(null);

  const urlBaseServer = Config.get("URL_API");
  const url_users = urlBaseServer + "users";
  const url_login = urlBaseServer + "login";

  const [user, setUser] = useState({});
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  /* const accessWithGoogle = async (tokenId, isLogin) => {
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
   };*/

 /* const handleLoginResponse = (token) => {
    if (!token) {
      throw new Error("Invalid response from server");
    }
    const decodedToken = jwtDecode(token);
    const id_user = decodedToken.id_user;
    setUserIsLoggedIn(true);
    sessionStorage.setItem("access_token", token);
    // Redirigir al perfil del usuario
    navigate(`mi-perfil/${id_user}`);
  };
  */

  // Ingreso con email
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
      return decodedToken.id_user;
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      throw new Error("Email y/o contraseña incorrecta.");
    }
  };

  // A donde se va el usuario después de iniciar sesión
  const handlePostLoginRedirect = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    navigate(redirectPath || `/mi-perfil/${user.id_user}`);
    setRedirectPath(null); // Limpiar la ruta de redirección después de usarla
  };

  // Registro con E-mail
const registerWithEmail = async (userData) => {
  try {
      if (!userData.email || !userData.password) {
          throw new Error("Por favor, ingresa un correo electrónico y una contraseña.");
      }
      await axios.post(url_users, userData);
      // Si el registro está OK, inicia sesión automático
      const credentials = {
          email: userData.email,
          password: userData.password
      };
      await loginWithEmail(credentials);
  } catch (error) {
      console.error("Error registering with email and password:", error);
      if (error.response && error.response.status === 409) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El email ya está registrado. Inicia sesión.',
          });
          return;
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error al registrar. Inténtalo de nuevo más tarde.',
          });
      }
      return;
  }
};


  const logout = () => {
    setUser({});
    setUserIsLoggedIn(false);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    navigate(`/`);
  };

  useEffect(() => {
    // Restore session if available
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("access_token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setUserIsLoggedIn(true);
    }
  }, [])

  // Redirect del carrito para iniciar sesión
  const setRedirectAfterLogin = (path) => {
    setRedirectPath(path);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userIsLoggedIn,
        setUserIsLoggedIn,
        loginWithEmail,
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
