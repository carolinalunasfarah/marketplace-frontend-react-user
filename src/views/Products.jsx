import React, { useContext, useEffect } from 'react';

// context
import { DataContext } from '../context/DataContext';

// components
import ProductsComponent from "../components/Products";

const Products = () => {
    const { title } = useContext(DataContext);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Tienda`;
    }, []);

    return <ProductsComponent />;
};

export default Products;
