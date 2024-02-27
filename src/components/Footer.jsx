import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import logo from "/assets/img/logo_icons/logoInactive.svg";

const Footer = () => {
    return (
        <>
            <footer className="position-relative pb-1">
                <section id="footer">
                    <Row className="flex-column flex-lg-row align-items-start pt-4 text-center">
                        <Col className="mt-2 mt-lg-2 pt-2">
                            <img
                                src={logo}
                                className="logoFooter"
                                alt="Ícono del logo"
                            />
                        </Col>
                        <Col className="mt-lg-2 pt-lg-2 navLinks">
                            <article>
                                <Link
                                    to="/inicia-sesion"
                                    className="text-decoration-none">
                                    Mi cuenta
                                </Link>
                                <Link
                                    to="/products"
                                    className="text-decoration-none">
                                    Tienda
                                </Link>
                                <Link to="/" className="text-decoration-none">
                                    Ayuda
                                </Link>
                            </article>
                        </Col>
                        <Col className="mt-lg-2 pt-lg-2">
                            <article className="my-2 my-lg-2">
                                <span className="me-2">
                                    DESARROLLADORES FULLSTACK
                                </span>{" "}
                                <h6 className="mt-4">
                                    <a
                                        href="https://github.com/JuanManuelJerezBaraona"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Juan Manuel Jerez
                                    </a>
                                </h6>
                                <h6>
                                    <a
                                        href="https://github.com/carolinalunasfarah"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Carolina Lunas
                                    </a>
                                </h6>
                                <h6>
                                    <a
                                        href="https://github.com/vnasp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Valentina Muñoz
                                    </a>
                                </h6>
                                <h6>
                                    <a
                                        href="https://github.com/elbenjaz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Benjamín Segura
                                    </a>
                                </h6>
                            </article>
                        </Col>
                    </Row>
                </section>
            </footer>
        </>
    );
};

export default Footer;
