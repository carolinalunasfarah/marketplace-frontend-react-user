import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

import { LoginGoogle } from "../components/GoogleLogIn";

// Bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// SweetAlert2
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
    name: "Mi gente",
    lastName: "Latino",
    email: "user1@example.com",
};

const Register = () => {
    const { users } = useContext(ProductContext);
    const [name, setName] = useState("");
    const [user, setUser] = useState(initialForm);
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            !user.name ||
            !user.lastName ||
            !user.email ||
            !user.password ||
            !user.passwordConfirm
        ) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        if (!emailRegex.test(user.email)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Por favor, introduce un email válido.",
            });
            return;
        }

        if (user.password !== user.passwordConfirm) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Las contraseñas no coinciden",
            });
            return;
        }
    };

    return (
        <Container fluid className="bg-body-secondary">
            <Row className="d-flex justify-content-center py-5">
                <Col className="bg-white col-5 border border-2 rounded-3 p-5">
                    <h1>Crear cuenta</h1>
                    <p>
                        Para que puedas acceder a tu perfil, ver tus compras y
                        favoritos
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup size="lg" className="mb-3">
                            <Form.Control
                                type="text"
                                id="registerName"
                                name="name"
                                value={user.name}
                                placeholder="Nombre"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup size="lg" className="mb-3">
                            <Form.Control
                                type="text"
                                id="registerLastName"
                                name="lastName"
                                value={user.lastName}
                                placeholder="Apellido"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup size="lg" className="mb-3">
                            <Form.Control
                                type="email"
                                id="registerEmail"
                                name="email"
                                value={user.email}
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup size="lg" className="mb-3">
                            <Form.Control
                                type="password"
                                id="registerPassword"
                                name="password"
                                value={user.password}
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup size="lg" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirma contraseña"
                                name="password"
                                value={user.passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            />
                        </InputGroup>
                        <Button
                            type="submit"
                            className="bg-primary border-0 w-100">
                            Crear Cuenta
                        </Button>
                        <article className="mt-5">
                            <p>o continúa con...</p>
                            <LoginGoogle />
                        </article>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
