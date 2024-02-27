import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { Link, NavLink } from 'react-router-dom';

// Bootstrap
import { Button } from "react-bootstrap";

// Notificaciones
import Swal from 'sweetalert2';

const Cart = () => {
    // Obtiene los datos del carrito desde el contexto
    const { cart, addToCart, removeFromCart, setTotalToPay } = useContext(DataContext);

    // Calcular el total a pagar sumando el precio de todos los productos en el carrito
    const subTotal = cart.items?.reduce((subTotal, item) => subTotal + (item.price * (item.quantity || 1)), 0) ?? 0;

    // Actualizar el total a pagar cuando cambie el carrito
    useEffect(() => {
        cart.total_price = subTotal; // Esto actualiza el total en el contexto de productos
        setTotalToPay(subTotal); // Esto actualiza el totalToPay en el contexto del carrito
    }, [cart, subTotal, setTotalToPay]);

    const handleCheckout = (event) => {
        if (!cart.items || cart.items.length === 0) {
            // Mostrar un mensaje al usuario
            Swal.fire('Ups...', 'Tu carrito está vacío.', 'error');
            // Cancelar la navegación
            event.preventDefault();
        } else {
            // Si el carrito no está vacío, desplazarse al inicio del checkout
            window.scrollTo({top: 0, behavior: 'instant'});
        }
    };

    const handleLinkClick = () => {
        window.scrollTo({top: 0, behavior: 'instant'});
    };

    return (
        <>
            <section className="container-fluid bg-white border-top">
                <div className='row col-12 col-md-8 mx-auto pb-5'>
                    <h2 className='display-5 py-5'>Tu Carrito</h2>
                    <table>
                        <thead>
                            <tr className="border-bottom">
                                <th scope="col" className="py-3">Producto</th>
                                <th scope="col" className="py-3">Cantidad</th>
                                <th scope="col" className="py-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items?.map((product, index) => (
                                product && (
                                    <tr key={index} className="border-bottom">
                                        <td className="py-4 col-5">
                                        <Link 
                                            to={`/product/${product.id_product}`}
                                            onClick={handleLinkClick}
                                            className="text-decoration-none text-dark"
                                        >
                                            <img src={product.image_url} alt={product.name} className="rounded p-2 mb-3" width="100"/>
                                            <p>{product.name}</p>
                                            <p>${product.price && product.price.toLocaleString('es-CL')}</p>
                                        </Link>
                                        </td>
                                        <td className='py-4 col-5'>
                                            <Button 
                                                onClick={() => removeFromCart(product)} 
                                                className='bg-danger py-1 rounded me-2 border-0 shadow-lg'
                                            >-</Button>
                                                {product.quantity}
                                            <Button 
                                                onClick={() => addToCart(product)} 
                                                className='bg-success py-1 rounded ms-2 border-0 shadow-lg'
                                            >+</Button>
                                        </td>
                                        <td className="py-4 col-2">${product.price && product.quantity && (product.price * product.quantity).toLocaleString('es-CL')}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <h2 className="text-md-end text-center mt-5">Subtotal: ${(subTotal).toLocaleString('es-CL')}</h2>
                        <p className="text-md-end text-center">Solo faltan los gastos de envío</p>
                        <div className="d-flex justify-content-end">
                            <NavLink 
                                to="/checkout" 
                                onClick={handleCheckout}
                                className="col-lg-4 col-12 btn py-3 rounded btn-primary shadow-lg"
                            >Pagar Pedido</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart