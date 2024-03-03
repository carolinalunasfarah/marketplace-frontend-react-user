// hooks
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// components
import NavigationTrail from "../components/NavigationTrail";
import GoogleButton from "../components/GoogleButton";

// notifications
import Swal from "sweetalert2";

const initialForm = { email: "jlo@mimarketlatino.com", password: "1234" };

const Login = () => {
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    const { users, title } = useContext(DataContext);
    const [user, setUser] = useState(initialForm);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Inicia Sesión`;
    }, []);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (source === "GoogleButton") {
            return;
        }

        if (!user.email || !user.password) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        const findId = users.find(
            (u) => u.email === user.email && u.password === user.password
        );

        if (!Auth.login(user)) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Usuario y/o contraseña incorrecta.",
            });
            return;
        }
    };
    const handleGoogleLogin = (response) => {
        navigate(`/mi-perfil/${response.id}`);
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
                            text: "Inicia Sesión",
                            active: true,
                        },
                    ]}></NavigationTrail>
            </section>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="col-12 col-md-6 bg-white box-shadow rounded-4 p-4">
                    <h1>Inicia Sesión</h1>
                    <p>
                        Iniciando sesión podrás acceder a tu perfil, revisar tus
                        compras y ventas ¡y crear productos!
                    </p>
                    <section>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="fs-6 ps-1 ps-lg-3">
                                    E-mail
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleUser}
                                    placeholder="tuemail@mail.com"
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="fs-6 ps-1 ps-lg-3">
                                    Contraseña
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleUser}
                                    placeholder="Tu contraseña"
                                    required
                                />
                            </InputGroup>
                            <Button
                                type="submit"
                                className="btn-primar border-0 w-100 mb-2">
                                Ingresar
                            </Button>
                        </Form>
                        <small className="text-center">
                            No te puedes olvidar de tu contraseña.
                        </small>
                    </section>
                    <section className="mt-5 text-center">
                        <p>o inicia sesión con...</p>
                        <article className="d-inline-block">
                            <GoogleButton
                                onSuccess={handleGoogleLogin}
                                scopes={["email"]}
                            />
                        </article>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
