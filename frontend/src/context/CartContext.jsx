import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de importar uuidv4

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // Inicializa totalToPay desde localStorage si existe; de lo contrario, usa 0
    const [totalToPay, setTotalToPay] = useState(() => {
        const savedTotalToPay = localStorage.getItem("totalToPay");
        return savedTotalToPay ? Number(savedTotalToPay) : 0;
    });

    const [shippingCost, setShippingCost] = useState(() => {
        // Intenta obtener el shippingCost desde localStorage o establece 0 si no existe
        const savedShippingCost = localStorage.getItem("shippingCost");
        return savedShippingCost ? JSON.parse(savedShippingCost) : 0;
    });

    const [totalToPayPlusShipping, setTotalToPayPlusShipping] = useState(0);
    const [orderID, setOrderID] = useState('');

    // Genera el orderID solo una vez cuando el componente se monta
    useEffect(() => {
        // Verifica si ya existe un orderID en localStorage, si no, genera uno nuevo.
        const existingOrderID = localStorage.getItem("orderID");
        if (existingOrderID) {
            setOrderID(existingOrderID);
        } else {
            const newOrderID = uuidv4();
            localStorage.setItem("orderID", newOrderID); // Opcional: Guarda el orderID en localStorage si necesitas persistirlo
            setOrderID(newOrderID);
        }
    }, []);

    // Efecto para guardar totalToPay en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("totalToPay", totalToPay.toString());
    }, [totalToPay]);

    // Efecto para guardar shippingCost en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("shippingCost", JSON.stringify(shippingCost));
    }, [shippingCost]);

    // Efecto para calcular el total a pagar incluyendo el costo de envío
    useEffect(() => {
        setTotalToPayPlusShipping(totalToPay + shippingCost);
    }, [totalToPay, shippingCost]);

    return (
        <CartContext.Provider value={{ totalToPay, setTotalToPay, shippingCost, setShippingCost, orderID, totalToPayPlusShipping }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;