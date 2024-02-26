import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";

import logoActive from "/assets/img/logo_icons/logoActive.svg";
import logoInactive from "/assets/img/logo_icons/logoInactive.svg";

import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext"

const Navigation = () => {
    const location = useLocation();
    const { emptyCart } = useContext(ProductContext);
    const { totalToPay } = useContext(CartContext);

    const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const isActive = (path) => location.pathname === path;
    const activeLogo = (path) => (isActive(path) ? "active" : "inactive");
    const logoSrc = isActive("/") ? logoActive : logoInactive;

    return (
        <Navbar className="navigation">
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
                    <NavLink className={activeClass} to="/register">
                        Crear Cuenta
                    </NavLink>
                    <NavLink className={activeClass} to="/login">
                        Ingresar
                    </NavLink>
                    <NavLink className={activeClass} to="/mi-perfil/1">
                        Mi Perfil
                    </NavLink>
                    <NavLink className={activeClass} to="/cart">
                    <i className="bi bi-cart4"></i> : {totalToPay}
                    </NavLink>
                </section>
            </div>
        </Navbar>
    );
};

export default Navigation;
