import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";
import logoInactive from "/assets/img/logo_icons/logoInactive.svg";

// context
import { ProductContext } from "../context/ProductContext";

const Navigation = () => {
    const location = useLocation();
    const [cart] = useContext(ProductContext);

    const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const isActive = (path) => location.pathname === path;
    const activeLogo = (path) => (isActive(path) ? "active" : "inactive");
    const logoSrc = isActive("/") ? logoActive : logoInactive;

    return (
        <Navbar className="navigation" sticky="top">
            <div className="navLinks">
                <section>
                    <NavLink className={activeLogo} to="/">
                        <img
                            src={logoSrc}
                            className="logo ms-2"
                            alt="Ícono del logo"
                        />
                    </NavLink>
                    <NavLink className={activeClass} to="/products">
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
