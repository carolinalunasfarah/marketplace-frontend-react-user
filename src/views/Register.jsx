import { NavLink } from "react-router-dom";

// hooks
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

// components
import GoogleButton from "../components/GoogleButton";
import { GoogleLogin } from "@react-oauth/google";
import NavigationTrail from "../components/NavigationTrail";

// notifications
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Register = () => {
    const { title } = useContext(DataContext);
    const { registerWithEmail, loginWithGoogle } = useContext(AuthContext);
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
        try {
            await registerWithEmail(user);
            navigate("/inicia-sesion");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const GoogleLoginOnSuccess = async (data) => {
        try {
            const { credential } = data;
            await loginWithGoogle(credential);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Error al intentar iniciar sesión con Google."
            });
        }
    };
    
    const GoogleLoginOnFailure = () => {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Error al intentar iniciar sesión con Google."
        });
    };

    // const handleGoogleRegister = async (response) => {
    //     try {
    //         const userData = await registerWithGoogle(response.tokenId);
    //         navigate(`/mi-perfil/${userData.id_user}`);
    //     } catch (error) {
    //         console.error("Error registering with Google:", error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Ups...",
    //             text: "Error al registrar con Google.",
    //         });
    //     }
    // };

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
                            <section className="mt-3 text-center">
                                <p className="cursor-default">
                                    si ya tienes una cuenta
                                </p>
                                <NavLink
                                    to="/inicia-sesion"
                                    className="btn-secondary border-0 w-100">
                                    <Button className="btn-secondary border-0 w-100">
                                        Iniciar sesión
                                    </Button>
                                </NavLink>
                            </section>
                            <section className="mt-5 text-center">
                                <p className="cursor-default">
                                    o continúa con...
                                </p>
                                <article className="d-inline-block">
                                    <Button className="btn-secondary border-0 w-100">
                                        <GoogleButton isLogin={false} />
                                    </Button>

                                    <GoogleLogin
                                        onSuccess={GoogleLoginOnSuccess}
                                        onFailure={GoogleLoginOnFailure}
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
