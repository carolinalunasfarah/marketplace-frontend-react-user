// hooks
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// components
import GoogleButton from "../components/GoogleButton";
import NavigationTrail from "../components/NavigationTrail";

// notifications
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
/* const initialForm = {
    firstname: "Mi gente",
    lastname: "Latino",
    email: "user1@example.com",
};*/

const Register = () => {
    const { users, setUsers, title } = useContext(DataContext);
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const navigate = useNavigate();

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Registro`;
    }, []);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstname, lastname, email, password, passwordConfirm } = user;
        if (
            !firstname ||
            !lastname ||
            !email ||
            !password ||
            !passwordConfirm
        ) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Por favor, introduce un email válido.",
            });
            return;
        }

        if (password !== passwordConfirm) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Las contraseñas no coinciden",
            });
            return;
        }

        const newUser = {
            id_user:
                users.length > 0
                    ? Math.max(...users.map((u) => u.id_user)) + 1
                    : 1,
            role: "registered",
            firstname,
            lastname,
            email,
            password,
        };
        setUsers([...users, newUser]);
        navigate("/inicia-sesion");
    };
    
    const handleGoogleRegister = (response, event) => {
        const { id } = response;
        navigate(`/mi-perfil/${id}`);
    };

    return (
        <Container fluid className="bg-body-secondary ">
            <section className="px-5 pt-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Inicio",
                            to: "/",
                        },
                        {
                            text: "Regístrate",
                            active: true,
                        },
                    ]}></NavigationTrail>
            </section>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="col-12 col-md-6 bg-white box-shadow rounded-4 p-4">
                    <h1 className="cursor-default">Crear cuenta</h1>
                    <p className="cursor-default">
                        Para que puedas acceder a tu perfil, ver tus compras y
                        favoritos!
                    </p>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="registerName"
                                    name="firstname"
                                    value={user.firstname}
                                    placeholder="Nombre"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={user.lastname}
                                    placeholder="Apellido"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="email"
                                    id="registerEmail"
                                    name="email"
                                    value={user.email}
                                    placeholder="E-mail"
                                    onChange={handleUser}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    id="registerPassword"
                                    name="password"
                                    value={user.password}
                                    placeholder="Contraseña"
                                    onChange={handleUser}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="passwordConfirm"
                                    value={user.passwordConfirm}
                                    placeholder="Confirma contraseña"
                                    onChange={handleUser}
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="btn-primary border-0 w-100">
                                Crear Cuenta
                            </Button>
                            <section className="mt-5 text-center">
                                <p className="cursor-default">o continúa con...</p>
                                <article className="d-inline-block">
                                    <GoogleButton
                                        onSuccess={(response, event) =>
                                            handleGoogleRegister(
                                                response,
                                                event
                                            )
                                        }
                                        scopes={["email"]}
                                    />
                                </article>
                            </section>
                        </Form>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
