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
                    <NavLink className={activeClass} to="/registro">
                        Crear Cuenta
                    </NavLink>
                    <NavLink className={activeClass} to="/inicia-sesion">
                        Ingresar
                    </NavLink>
                    <NavLink className={activeClass} to="/carrito">
                        <i className="bi bi-cart4"></i>: {cart.total_items}
                    </NavLink>
                </section>
            </div>
        </Navbar>
    );
};

export default Navigation;