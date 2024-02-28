import { NavLink, useLocation } from "react-router-dom";

// hooks
import { useContext } from "react";

// react-bootstrap
import { Container, Nav, Navbar, Offcanvas, Image } from "react-bootstrap"

// resources
import logoActive from "/assets/img/logo_icons/logoActive.svg";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";


function Navigation() {
  const Auth = useContext(AuthContext);

  const location = useLocation();
  const { cart } = useContext(DataContext);

  const activeClass = ({ isActive }) => (isActive ? "active" : "inactive");
  const isActive = (path) => location.pathname === path;

  // Desplazarse al inicio de la página
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {['sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 fixed-top bg-secondary" variant="dark">
          <Container fluid>
            <Navbar.Brand className="title fs-4 text-white" href="/" onClick={handleLinkClick}><Image src={logoActive} width={50} className="me-3" />Mi Gente Latino</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="bg-secondary">
              <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
                  <NavLink className={activeClass} to="/products" onClick={handleLinkClick}>Productos</NavLink>
                  {!Auth.userIsLoggedIn &&
                    <>
                      <NavLink className={activeClass} to="/registro" onClick={handleLinkClick}>Registrarse</NavLink>
                      <NavLink className={activeClass} to="/inicia-sesion" onClick={handleLinkClick}>Iniciar Sesión</NavLink>
                    </>
                  }
                  {Auth.userIsLoggedIn &&
                    <>
                      <NavLink className={activeClass} to={`/mi-perfil/${Auth.user.id_user}`} onClick={handleLinkClick}>
                        Mi Perfil
                      </NavLink>
                      <div className="d-flex flex-column flex-lg-row align-items-center">
                        <Image src={Auth.user.avatar_url} width={50} className="img-fluid rounded-circle" />
                        <NavLink className="text-white fw-normal lh-1 d-flex flex-row flex-lg-column flex-lg-column ms-lg-2" to={`/mi-perfil/${Auth.user.id_user}`} onClick={handleLinkClick}>
                          <span className="fs-6 lh-1 me-2">Hola</span>
                          <span>{Auth.user.firstname}</span>
                        </NavLink>
                      </div>
                      <NavLink className="text-white fw-normal" to="/" onClick={Auth.logout}>
                        Cerrar sesión
                      </NavLink>
                    </>
                  }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <NavLink className={`text-white fs-5 me-2 me-lg-5`} to="/carrito" onClick={handleLinkClick}>
              <i className="bi bi-cart4 fs-4 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.6em', padding: '0.25em 0.4em' }}>
                  {cart.total_items}
                  <span className="visually-hidden">items en el carrito</span>
                </span>
              </i>
            </NavLink>
          </Container>
      ))}
    </>
  );
}

export default Navigation;