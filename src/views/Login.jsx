import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Form, InputGroup, Button, Alert } from "react-bootstrap";

// components
import { LoginGoogle } from "../components/GoogleLogIn";


const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: "user1@example.com", password: "password1" };

const Login = () => {
    const { users } = useContext(DataContext);
    const [user, setUser] = useState(initialForm);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user.email.trim() || !user.password.trim()) {
            setShowAlert(true);
        }

        if (!emailRegex.test(user.email)) {
            return window.alert("El formato del email no es correcto!");
        }

        const findId = users.find(
            (u) => u.email === user.email && u.password === user.password
        );
        if (findId) {
            navigate(`/mi-perfil/${findId.id_user}`);
        } else {
            setShowAlert(true);
        }
    };

    return (
        <Container fluid className="bg-body-secondary">
            <Row className="d-flex justify-content-center py-5">
                <Col className="bg-white col-5 border border-2 rounded-3 p-5">
                    <h1>Inicia Sesión</h1>
                    <p>
                        Iniciando sesión podrás acceder a tu perfil, revisar tus
                        compras y ventas ¡y crear productos!
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup size="lg" className="mb-3">
                            <InputGroup.Text
                                id="inputGroup-sizing-lg"
                                className="fs-6 px-3 w-25">
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
                        <InputGroup size="lg" className="mb-3">
                            <InputGroup.Text
                                id="inputGroup-sizing-lg"
                                className="fs-6 px-3 w-25">
                                Contraseña
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
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
                            className="bg-primary border-0 w-100">
                            Ingresar
                        </Button>
                        <section className="mt-5 text-center">
                            <p>o continúa con...</p>
                            <article className="d-inline-block">
                                <LoginGoogle />
                            </article>
                        </section>
                    </Form>
                    {showAlert && (
                        <Alert
                            variant="danger"
                            onClose={() => setShowAlert(false)}
                            dismissible
                            className="mt-4">
                            El e-mail o contraseña es incorrecto.
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
