import { Link } from "react-router-dom";

// react-bootstrap
import { Row, Col, Badge } from "react-bootstrap";

// resources
import logoWhite from "/assets/img/logo_icons/logoWhite.svg";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <>
            <footer className="container-fluid text-white p-0">
                <section>
                    <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4 px-4 pt-4">
                        <Col className="text-center d-md-none d-lg-block pt-4">
                            <img
                                src={logoWhite}
                                className="logoFooter"
                                alt="Ícono del logo"
                            />
                            <p className="title fs-5">Mi Market Latino</p>
                            <p className="fs-6"></p>
                        </Col>
                        <Col className="pt-4">
                            <Badge className="bg-secondary fs-6 text-white mb-2">
                                Enlaces Útiles
                            </Badge>
                            <ul>
                                <li>
                                    <Link
                                        to="/inicia-sesion"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Mi cuenta
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/productos"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Los mejores productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/preguntas-frecuentes"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Preguntas frecuentes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className="text-decoration-none mb-2"
                                        onClick={scrollToTop}>
                                        Sobre Mi Gente Latino
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col className="pt-4">
                            <div>
                                {" "}
                                <Badge className="bg-secondary fs-6 text-white mb-2">
                                    Desarrolladores
                                </Badge>
                                <h6 className="b text-uppercase fw-bolder">
                                    Full Stack Javascript
                                </h6>
                            </div>
                            <ul className="list-unstyled">
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/JuanManuelJerezBaraona"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2 text-white "></i>
                                        Juan Manuel Jerez
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/carolinalunasfarah"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Carolina Lunas
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/vnasp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Valentina Muñoz
                                    </a>
                                </li>
                                <li className="bg-primary border-0">
                                    <a
                                        href="https://github.com/elbenjaz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none">
                                        <i className="bi bi-github me-2"></i>
                                        Benjamín Segura
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col className="pt-4">
                            <div>
                                {" "}
                                <Badge className="bg-secondary fs-6 text-white mb-2">
                                    Evaluadores
                                </Badge>
                                <h6 className="b text-uppercase fw-bolder">
                                    DesafioLATAM G37
                                </h6>
                            </div>
                            <ul className="list-unstyled">
                                <li className="bg-primary border-0">
                                    <img
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Fabián Pino
                                </li>
                                <li className="bg-primary border-0">
                                    <img
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Albamar Flores
                                </li>
                                <li className="bg-primary border-0">
                                    <img
                                        src="../assets/img/desafiolatam.webp"
                                        width={20}
                                        className="rounded-1 me-2"
                                    />
                                    Francisco Marin
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </section>
                <section className="bg-copyright text-center mt-3 py-3">
                    2024 - DesafioLATAM
                </section>
            </footer>
        </>
    );
};

export default Footer;
