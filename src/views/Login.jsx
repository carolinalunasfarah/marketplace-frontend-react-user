import { NavLink, useNavigate } from "react-router-dom";

// hooks
import { useState, useContext, useEffect } from "react";

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

const Login = () => {
    const navigate = useNavigate();
    const { loginWithEmail, userIsLoggedIn, setUserIsLoggedIn } =
        useContext(AuthContext);

    const { title } = useContext(DataContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Inicia Sesión`;
    }, []);

    // Si ya estás logueado, te vas al home
    useEffect(() => {
        if (userIsLoggedIn) {
            navigate('/');
        }
    }, [userIsLoggedIn, navigate]);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.email || !user.password) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        try {
          const userId = await loginWithEmail(user);
          setUserIsLoggedIn(true);
          navigate(`/mi-perfil/${userId}`)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Ups...",
                text: "Email y/o contraseña incorrecta.",
            });
        }
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
                        },
                    ]}></NavigationTrail>
            </section>
            <Row className="d-flex justify-content-center mx-1 mx-lg-0 py-4">
                <Col className="col-12 col-md-6 bg-white box-shadow rounded-4 p-4">
                    <h1 className="cursor-default">Inicia Sesión</h1>
                    <p className="cursor-default">
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
                                className="btn-primary border-0 w-100 mb-2">
                                Ingresar
                            </Button>
                            <small className="text-center cursor-default">
                                No te puedes olvidar de tu contraseña.
                            </small>
                            <section className="mt-3 text-center">
                                <p className="cursor-default">
                                    si aún no tienes una cuenta
                                </p>
                                <NavLink
                                    to="/registro"
                                    className="btn-secondary border-0 w-100">
                                    <Button className="btn-secondary border-0 w-100">
                                        Regístrate
                                    </Button>
                                </NavLink>
                            </section>
                        </Form>
                    </section>
              {/*     <section className="mt-5 text-center ">
                        <p className="cursor-default">o inicia sesión con...</p>
                            <GoogleButton isLogin={true} />
                  </section>*/}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
