import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";

import logoActive from "../img/logoActive.svg";
import logoInactive from "../img/logoInactive.svg";

import { ProductContext } from "../context/ProductContext";

const Navigation = () => {
    const location = useLocation();
    const { emptyCart } = useContext(ProductContext);

    const isActive = (path) => location.pathname === path;
    const activeClass = (path) => (isActive(path) ? "active" : "inactive");
    const logoSrc = isActive("/") ? logoActive : logoInactive;

    return (
        <Navbar className="navigation">
            <section className="navLinks">
                <div>
                    <NavLink className={activeClass} to="/">
                        <img
                            src={logoSrc}
                            className="logo"
                            alt="Ícono del logo"
                        />
                    </NavLink>
                    <NavLink className={activeClass} to="/products">
                        {" "}
                        Tienda
                    </NavLink>
                </div>
                <div>
                    <NavLink className={activeClass} to="/register">
                        Crear Cuenta
                    </NavLink>
                    <NavLink className={activeClass} to="/login">
                        Ingresar
                    </NavLink>
                    <NavLink className={activeClass} to="/cart">
                        Carrito: {emptyCart}
                    </NavLink>
                </div>
            </section>
        </Navbar>
    );
};

export default Navigation;
