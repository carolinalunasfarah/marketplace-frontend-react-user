// hooks
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Container } from "react-bootstrap";

const OrderConfirmation = () => {
    const {
        cart,
        shippingCost,
        totalToPayPlusShipping,
        formatPrice,
        title,
    } = useContext(DataContext);

    const { user, userIsLoggedIn } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Confirmación`;
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (userIsLoggedIn) {
                const token = sessionStorage.getItem("access_token");
                const urlBaseServer = Config.get("URL_API");
                try {
                    const response = await axios.get(`${urlBaseServer}orders/purchases`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setOrders(response.data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [userIsLoggedIn]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!orders.length) {
        return <p>No se encontraron órdenes.</p>;
    }

    return (
        <>
            <Container className="col-lg-6 col-md-8 mx-auto text-center py-5 mt-5">
                <h1 className="py-3">¡Gracias por tu compra!</h1>
                <p>Tu pedido ha sido recibido y está siendo procesado.</p>
                
                {orders.map((order, index) => (
                    <div key={index} className="my-4">
                        <strong>Número de Orden: {order.id_order}</strong>
                        {order.products.map((product, productIndex) => (
                            <div key={productIndex} className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0">{product.product_name}</p>
                                    <small>Cantidad: {product.product_quantity}</small>
                                </div>
                                <span>
                                    ${product.unit_price.toLocaleString("es-CL")}
                                </span>
                            </div>
                        ))}
                        <div className="border-top my-4">
                            <p className="mt-3">Total: ${order.total_price.toLocaleString("es-CL")}</p>
                        </div>
                    </div>
                ))}
            </Container>
        </>
    );
};

export default OrderConfirmation;
