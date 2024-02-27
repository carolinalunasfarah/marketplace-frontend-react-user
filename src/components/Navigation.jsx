import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";

// react-bootstrap
import Navbar from "react-bootstrap/Navbar";

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";
import logoInactive from "/assets/img/logo_icons/logoInactive.svg";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";


const Navigation = () => {
    const Auth = useContext(AuthContext);
    
    const location = useLocation();
    const { cart } = useContext(DataContext);

    const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const isActive = (path) => location.pathname === path;
    const activeLogo = (path) => (isActive(path) ? "active" : "inactive");
    const logoSrc = isActive("/") ? logoActive : logoInactive;

    // Desplazarse al inicio de la página
    const handleLinkClick = () => {
        window.scrollTo({top: 0, behavior: 'instant'});
    };

    return (
        <Navbar className="navigation box-shadow" sticky="top">
            <div className="navLinks">
                <section>
                    <NavLink className={activeLogo} to="/" onClick={handleLinkClick}>
                        <img
                            src={logoSrc}
                            className="logo ms-2"
                            alt="Ícono del logo"
                        />
                    </NavLink>
                    <NavLink className={activeClass} to="/products" onClick={handleLinkClick}>
                        Tienda
                    </NavLink>
                </section>
                
                <section>
                    {!Auth.userIsLoggedIn && 
                    <>
                        <NavLink className={activeClass} to="/registro" onClick={handleLinkClick}>
                            Registrarse
                        </NavLink>
                        <NavLink className={activeClass} to="/inicia-sesion" onClick={handleLinkClick}>
                            Iniciar sesión
                        </NavLink>
                    </>
                    }    

                    {Auth.userIsLoggedIn && 
                        <div className="d-flex">
                            <NavLink className={activeClass} to="/carrito" onClick={handleLinkClick}>
                                <i className="bi bi-cart4"></i>: {cart.total_items}
                            </NavLink>
                            
                            <img src={Auth.user.avatar_url} width="50" className="rounded-circle me-2" />

                            <div>
                                <NavLink className={activeClass} to={`/mi-perfil/${Auth.user.id_user}`}>
                                    {Auth.user.firstname} {Auth.user.lastname}<br/>
                                </NavLink>
                                <a href="#"  onClick={Auth.logout}>
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    }
                </section>
            </div>
        </Navbar>
    );
};

export default Navigation;