import { NavLink } from "react-router-dom";

// hooks
import { useContext, useState, useEffect } from "react";

// react-bootstrap
import { Container, Nav, Navbar, Offcanvas, Image } from "react-bootstrap";

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

function Navigation() {
    const { cart } = useContext(DataContext);
    const { logout, userIsLoggedIn, setUserIsLoggedIn } =
        useContext(AuthContext);
    const [user, setUser] = useState({});
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const urlBaseServer = Config.get("URL_API");

    const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");

    // Desplazarse al inicio de la página
    const handleLinkClick = () => {
        setShowOffcanvas(false);
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Obtener usuario
    const fetchUser = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            if (token) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(
                    `${urlBaseServer}/users/${user.id_user}`,
                    config
                );
                const userData = response.data;
                setUser(userData);
                setUserIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <Navbar
                key="md"
                expand="md"
                className="sticky-top bg-secondary"
                variant="dark">
                <Container fluid>
                    <Navbar.Brand
                        className="title fs-4 text-white"
                        href="/"
                        onClick={handleLinkClick}>
                        <Image src={logoActive} width={50} className="me-3" />
                        Mi Gente Latino
                    </Navbar.Brand>
                    <Navbar.Toggle
                        onClick={() => setShowOffcanvas(true)}
                        aria-controls="offcanvasNavbar-expand-md"
                    />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-md"
                        aria-labelledby="offcanvasNavbarLabel-expand-md"
                        placement="end"
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                                Menú
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="bg-secondary">
                            <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 gap-3">
                                <NavLink
                                    className={activeClass}
                                    to="/productos"
                                    onClick={handleLinkClick}>
                                    Productos
                                </NavLink>
                                {!userIsLoggedIn && (
                                    <>
                                        <NavLink
                                            className={activeClass}
                                            to="/registro"
                                            onClick={handleLinkClick}>
                                            Registrarse
                                        </NavLink>
                                        <NavLink
                                            className={activeClass}
                                            to="/inicia-sesion"
                                            onClick={handleLinkClick}>
                                            Iniciar Sesión
                                        </NavLink>
                                    </>
                                )}

                                {userIsLoggedIn && user && (
                                    <>
                                        <NavLink
                                            className={activeClass}
                                            to={`/mi-perfil/${user.id_user}`}
                                            onClick={handleLinkClick}>
                                            Mi Perfil
                                        </NavLink>
                                        {user.firstname && user.avatar_url && (
                                            <div className="d-flex flex-column flex-lg-row align-items-center">
                                                <Image
                                                    src={user.avatar_url}
                                                    width={50}
                                                    className="img-fluid rounded-circle"
                                                />
                                                <div
                                                    className="text-white fw-normal lh-1 d-flex flex-row flex-lg-column flex-lg-column mx-lg-4"
                                                    to={`/mi-perfil/${user.id_user}`}
                                                    onClick={handleLinkClick}>
                                                    <span className="fs-6 lh-1 me-2 mt-1">
                                                        Hola {user.firstname}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <NavLink
                                            className="inactive"
                                            to="/"
                                            onClick={logout}>
                                            Cerrar sesión
                                        </NavLink>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <NavLink
                        className={`text-white fs-5 me-2 me-lg-5`}
                        to="/carrito"
                        onClick={handleLinkClick}>
                        <i className="bi bi-cart4 fs-4 position-relative">
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                                style={{
                                    fontSize: "0.6em",
                                    padding: "0.25em 0.4em",
                                }}>
                                {cart.total_items}
                                <span className="visually-hidden">
                                    items en el carrito
                                </span>
                            </span>
                        </i>
                    </NavLink>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
