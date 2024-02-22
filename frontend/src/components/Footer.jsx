import { Row, Col } from "react-bootstrap";
import logo from "../img/logoInactive.svg";

const Footer = () => {
    return (
        <>
            <footer className="position-relative mt-4">
                <sectionv className="skewed-footer"></sectionv>
                <section id="footer">
                    <Row className="flex-column flex-lg-row align-items-start pt-4 m-4 text-center bg-opacity-25">
                        <Col className="mt-2 mt-lg-4 pt-4">
                            <img
                                src={logo}
                                className="logoFooter"
                                alt="Ícono carro de compras"
                            />
                        </Col>
                        <Col className="mt-lg-4 pt-lg-4">dsadas</Col>
                        <Col className="mt-lg-4 pt-lg-4">
                            <article className="my-2 my-lg-4">
                                <span className="badge-red p-1 me-2">
                                    DESARROLLADORES FULLSTACK
                                </span>{" "}
                                <h6 className="mt-3">Juan Manuel Jerez</h6>
                                <h6>Carolina Lunas</h6>
                                <h6>Valentina Muñoz</h6>
                                <h6>Benjamín Segura</h6>
                            </article>
                        </Col>
                    </Row>
                </section>
            </footer>
        </>
    );
};

export default Footer;
