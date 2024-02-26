import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

// Bootstrap
import { Container } from 'react-bootstrap';

// UUID
import { v4 as uuidv4 } from 'uuid';

const OrderConfirmation = () => {
    const { cart } = useContext(ProductContext);
    const { totalToPay, setTotalToPay, shippingCost } = useContext(CartContext);
    const [orderID, setOrderID] = useState('');

    useEffect(() => {
        // Genera el UID para el número de orden cuando el componente se monta
        setOrderID(uuidv4());
    }, []);

    // Calcular el subtotal aquí si no se pasa directamente desde el contexto
    const subTotal = cart.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

    // Actualizar el total a pagar cuando cambie el carrito
    useEffect(() => {
        setTotalToPay(subTotal + shippingCost);
    }, [subTotal, shippingCost]);

    return (
        <Container className="col-lg-6 col-md-8 mx-auto text-center py-5">
            <h2 className="display-5 py-3">¡Gracias por tu compra!</h2>
            <p>Tu pedido ha sido recibido y está siendo procesado.</p>
            <p><strong>Número de Orden:</strong> {orderID}</p>
            
            <div className="my-4">
                {cart.items.map((product, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={product.image_url} alt={product.name} className="rounded me-2" width="50" />
                            <div>
                                <p className="mb-0">{product.name}</p>
                                <small>Cantidad: {product.quantity}</small>
                            </div>
                        </div>
                        <span>${(product.price * product.quantity).toLocaleString("es-CL")}</span>
                    </div>
                ))}
            </div>

            <div className="border-top my-4">
                <p className="mt-3">Subtotal: ${subTotal.toLocaleString("es-CL")}</p>
                <p>Envío: ${shippingCost.toLocaleString("es-CL")}</p>
                <h4 className="fw-bold">Total: ${totalToPay.toLocaleString("es-CL")}</h4>
            </div>

            <p className="mt-4">Recibirás un correo electrónico con los detalles de tu pedido y la información de seguimiento una vez que tu pedido haya sido enviado.</p>
        </Container>
    );
}

export default OrderConfirmation;