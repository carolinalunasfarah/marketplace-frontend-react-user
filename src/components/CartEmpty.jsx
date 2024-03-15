import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <>
            <h2>Tu carrito está vacío</h2>
            <i className="bi bi-tag"></i> Compra ahora y consigue el envío
            gratis ¡por tiempo limitado!
        </>
    );
};

export default CartEmpty;
