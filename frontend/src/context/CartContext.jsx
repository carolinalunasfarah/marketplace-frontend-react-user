import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // Inicializa el carrito con los datos almacenados en LocalStorage o un arreglo vacío si no hay datos.
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

    const [cart, setCart] = useState(initialCart); // Aquí se guardan los productos que el usuario agrega al carrito
    const [totalToPay, setTotalToPay] = useState(0); // Guarda el total a pagar $.

    // Guarda el carrito en LocalStorage cuando cambie.
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, totalToPay, setTotalToPay }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;