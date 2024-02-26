import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [totalToPay, setTotalToPay] = useState(0); // Guarda el total a pagar $.
    const [shippingCost, setShippingCost] = useState(() => {
        // Intenta obtener el shippingCost desde localStorage o establece 0 si no existe
        const savedShippingCost = localStorage.getItem("shippingCost");
        return savedShippingCost ? JSON.parse(savedShippingCost) : 0;
    });

    // Efecto para guardar shippingCost en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("shippingCost", JSON.stringify(shippingCost));
    }, [shippingCost]);

    return (
        <CartContext.Provider value={{ totalToPay, setTotalToPay, shippingCost, setShippingCost }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;