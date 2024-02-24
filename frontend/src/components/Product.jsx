import { useContext } from "react";
import { Badge, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";

const Product = ({ product }) => {
    const { addToCart, formatPrice, getCategory } = useContext(ProductContext);

    return (
        <div className="product-card d-flex flex-column justify-content-between" data-id_product={product.id_product}>
            <div className="product-favorite">❤ FAV</div>

            <div className="text-center">
                <img src={product.image_url} />
            </div>

            <p className="my-2"><b>{product.name.toUpperCase()}</b></p>
            
            <div className="d-flex justify-content-between mb-2">
                <Badge bg="success" className="Category fs-6" data-id_category={product.id_category}>{getCategory(product.id_category, "name")}</Badge>
                <Badge bg="primary" className="fs-6">{formatPrice(product.price)}</Badge>
            </div>

            <Link className="btn btn-warning" to={`/product/${product.id_product}`}>
                Ver detalles
            </Link>

            <Button variant="primary" className="mt-1" onClick={() => addToCart(product)}>
                <i className="bi bi-plus"></i><i className="bi bi-cart4"></i> Agregar al carrito
            </Button>
        </div>
    );
}

export default Product;
