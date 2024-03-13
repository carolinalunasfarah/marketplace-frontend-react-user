// react-router
import { useNavigate } from "react-router-dom";

// hooks
import { useContext, useState, useEffect } from "react";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container, Form, Button } from "react-bootstrap";

// components
import NavigationTrail from "../components/NavigationTrail";

// notifications
import Swal from "sweetalert2";

// payment icons
import americanExpress from "/assets/img/payment_icons/american-express.svg";
import dinersClub from "/assets/img/payment_icons/diners-club.svg";
import masterCard from "/assets/img/payment_icons/master-card.svg";
import mercadoPago from "/assets/img/payment_icons/mercado-pago.svg";
import visa from "/assets/img/payment_icons/visa.svg";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const Checkout = () => {
    const {
        cart,
        shippingCost,
        setShippingCost,
        totalToPayPlusShipping,
        createOrder,
        formatPrice,
        title,
        emptyCart,
    } = useContext(DataContext);
    const { user, userIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const urlBaseServer = Config.get("URL_API");
    const url_orders = urlBaseServer + "orders";

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Checkout`;
    }, []);

    const [userData, setUserData] = useState({});
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        region: "",
        commune: "",
        address: "",
        paymentMethod: "mercadoPago",
    };

    const [formData, setFormData] = useState(initialFormData);

    const fetchUserData = async () => {
        try {
            // Usuario loggeado, tenemos datos
            if (userIsLoggedIn) {
                const token = sessionStorage.getItem("access_token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const userDataResponse = await axios.get(
                    `${urlBaseServer}/users/${user.id_user}`,
                    config
                );
                setUserData(userDataResponse.data);
                setUserDataLoaded(true);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (userIsLoggedIn && !userDataLoaded) {
            fetchUserData();
        }
    }, [userIsLoggedIn, userDataLoaded]);

    useEffect(() => {
        if (userDataLoaded) {
            setFormData({
                firstName: userData.firstname,
                lastName: userData.lastname,
                email: userData.email,
                phone: userData.phone || "",
                region: "",
                commune: "",
                address: userData.address || "",
                paymentMethod: "mercadoPago",
            });
        }
    }, [userDataLoaded, userData]);

    useEffect(() => {
        setShippingCost(shippingCosts[formData.region] || 0);
    }, [formData.region]);

    const shippingCosts = {
        "Arica y Parinacota": 4800,
        Tarapacá: 4800,
        Antofagasta: 4800,
        Atacama: 4000,
        Coquimbo: 4000,
        Valparaíso: 4000,
        Metropolitana: 2800,
        "O'Higgins": 4000,
        Maule: 4000,
        Ñuble: 4000,
        Biobío: 4000,
        "La Araucanía": 4000,
        "Los Ríos": 4000,
        "Los Lagos": 4000,
        Aysén: 4800,
        Magallanes: 4800,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado con el nuevo valor para el campo correspondiente
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^\+?[0-9]{9,15}$/;
        return phoneRegex.test(phone);
    };

    const isFieldEmpty = (field) => field.trim() === "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (Object.values(formData).some(isFieldEmpty)) {
            Swal.fire("Error", "Por favor, rellena todos los campos.", "error");
            return;
        }

        if (!isValidPhone(formData.phone)) {
            Swal.fire(
                "Error",
                "Por favor, introduce un número de teléfono válido.",
                "error"
            );
            return;
        }

        // Lógica para enviar los datos al servidor
        try {
            const orderData = {
                products: cart.items.map((item) => ({
                    id_product: item.id_product,
                    product_quantity: item.quantity,
                    unit_price: item.price,
                })),
                total_price: totalToPayPlusShipping,
            };

            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${url_orders}`,
                orderData,
                config
            );
            const order = response.data;
            emptyCart();
            navigate("/confirmacion");

            // Desplázate al inicio de la página de confirmación
            window.scrollTo({ top: 0, behavior: "instant" });

            // Limpiar el formulario después de un envío exitoso
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                region: "",
                commune: "",
                address: "",
                paymentMethod: "",
            });
        } catch (error) {
            console.error("Error creating order:", error);
            Swal.fire(
                "Error",
                "Hubo un problema con tu pedido. Por favor, intenta de nuevo más tarde.",
                "error"
            );
        }
    };

    return (
        <>
            <section className="container-fluid bg-white border-top padding-top-custom">
                <section className="px-5 pt-4">
                    <NavigationTrail
                        paths={[
                            {
                                text: "Carrito",
                                to: "/carrito",
                            },
                            {
                                text: "Checkout",
                            },
                        ]}></NavigationTrail>
                </section>
                <div className="row">
                    {/* Formulario */}
                    <Container className="row col-lg-4 col-md-6 form-signin mx-auto">
                        <Form onSubmit={handleSubmit}>
                            <h1 className="pt-5">Entrega</h1>
                            <p className="pb-2">Dirección de facturación</p>

                            {/* Nombre */}
                            <article className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingFirstName"
                                    placeholder="Nombre"
                                    name="firstName"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingFirstName">
                                    Nombre
                                </label>
                            </article>

                            {/* Apellidos */}
                            <article className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingLastName"
                                    placeholder="Apellidos"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingLastName">
                                    Apellido
                                </label>
                            </article>

                            {/* Email */}
                            <article className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="name@example.com"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <label htmlFor="floatingEmail">
                                    Correo Electrónico
                                </label>
                            </article>

                            {/* Teléfono */}
                            <article className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="floatingPhone"
                                    placeholder="Número de teléfono"
                                    name="phone"
                                    autoComplete="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingPhone">Teléfono</label>
                            </article>

                            {/* Región */}
                            <article className="form-floating mb-3">
                                <select
                                    className="form-control"
                                    id="floatingRegion"
                                    name="region"
                                    autoComplete="region"
                                    value={formData.region}
                                    onChange={handleChange}>
                                    <option value="">
                                        Selecciona una región
                                    </option>
                                    <option value="Arica y Parinacota">
                                        Arica y Parinacota
                                    </option>
                                    <option value="Tarapacá">Tarapacá</option>
                                    <option value="Antofagasta">
                                        Antofagasta
                                    </option>
                                    <option value="Atacama">Atacama</option>
                                    <option value="Coquimbo">Coquimbo</option>
                                    <option value="Valparaíso">
                                        Valparaíso
                                    </option>
                                    <option value="Metropolitana">
                                        Metropolitana
                                    </option>
                                    <option value="O'Higgins">O'Higgins</option>
                                    <option value="Maule">Maule</option>
                                    <option value="Ñuble">Ñuble</option>
                                    <option value="Biobío">Biobío</option>
                                    <option value="La Araucanía">
                                        La Araucanía
                                    </option>
                                    <option value="Los Ríos">Los Ríos</option>
                                    <option value="Los Lagos">Los Lagos</option>
                                    <option value="Aysén">Aysén</option>
                                    <option value="Magallanes">
                                        Magallanes
                                    </option>
                                </select>
                                <label htmlFor="floatingRegion">Región</label>
                            </article>

                            {/* Comuna */}
                            <article className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCommune"
                                    placeholder="Comuna"
                                    name="commune"
                                    autoComplete="commune"
                                    value={formData.commune}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingCommune">Comuna</label>
                            </article>

                            {/* Dirección */}
                            <article className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingAddress"
                                    placeholder="Dirección"
                                    name="address"
                                    autoComplete="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingAddress">
                                    Dirección
                                </label>
                            </article>

                            {/* Método de Pago */}
                            <h1 className="pt-5">Pago</h1>
                            <p className="mb-4">
                                Todas las transacciones son seguras y están
                                encriptadas.
                            </p>

                            <section>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input bg-secondary"
                                        type="radio"
                                        name="paymentMethod"
                                        id="mercadoPago"
                                        value="mercadoPago" // Asigna un valor específico
                                        checked={
                                            formData.paymentMethod ===
                                            "mercadoPago"
                                        } // Asegura que el radio esté seleccionado cuando corresponda
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                paymentMethod: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="mercadoPago">
                                        Mercado Pago
                                        <img
                                            src={mercadoPago}
                                            alt="mercado pago"
                                            className="ms-1 me-1"
                                        />
                                        <img src={visa} alt="visa" />
                                        <img
                                            src={masterCard}
                                            alt="master card"
                                            className="me-1"
                                        />
                                        <img
                                            src={americanExpress}
                                            alt="american express"
                                            className="me-1"
                                        />
                                        <img
                                            src={dinersClub}
                                            alt="diners club"
                                        />
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input bg-secondary"
                                        type="radio"
                                        name="paymentMethod"
                                        id="transferencia"
                                        value="transferencia" // Asigna un valor específico
                                        checked={
                                            formData.paymentMethod ===
                                            "transferencia"
                                        } // Asegura que el radio esté seleccionado cuando corresponda
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                paymentMethod: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="transferencia">
                                        Transferencia Bancaria
                                    </label>
                                </div>
                            </section>

                            <Button
                                className="col-12 btn py-3 btn-primary text-white fw-bold shadow-lg mt-5 mb-5"
                                type="submit">
                                Pagar Ahora
                            </Button>
                        </Form>
                    </Container>

                    {/* Resumen de Compra */}
                    <Container className="col-lg-4 col-md-6 mx-auto px-4">
                        <h1 className="py-5">Resumen</h1>
                        {cart.items?.map(
                            (product, index) =>
                                product && (
                                    <div key={index} className="pb-4">
                                        {/* Notificación de Cantidad */}
                                        <div className="position-relative d-inline-block">
                                            {product.quantity > 0 && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                                    {product.quantity}
                                                    <span className="visually-hidden">
                                                        productos no leídos
                                                    </span>
                                                </span>
                                            )}
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="rounded p-2 mb-3 shadow-lg"
                                                width="100"
                                            />
                                        </div>
                                        <p>{product.name}</p>
                                        <p className="m-0">
                                            $
                                            {product.price &&
                                                product.quantity &&
                                                (
                                                    product.price *
                                                    product.quantity
                                                ).toLocaleString("es-CL")}
                                        </p>
                                    </div>
                                )
                        )}
                        <p className="border-top pt-4">
                            Subtotal: {formatPrice(cart.total_price)}
                        </p>
                        <p>Envío: {formatPrice(shippingCost)}</p>
                        <h4 className="fw-bold pb-5">
                            Total: {formatPrice(totalToPayPlusShipping)}
                        </h4>
                    </Container>
                </div>
            </section>
        </>
    );
};

export default Checkout;
