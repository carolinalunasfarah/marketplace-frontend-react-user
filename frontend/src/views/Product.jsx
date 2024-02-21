import { useContext, useEffect } from "react";
import { Badge, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Error404 from "./Error404";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { ProductContext } from "../context/ProductContext";

const Product = () => {
    const { 
        title, 
        products, addToCart, removeFromCart, confirmCart, getQuantityFromCart,
        formatPrice, getCategory 
    } = useContext(ProductContext);
    const { id_product } = useParams();

    const product = products[products.findIndex(product => Number(product.id_product) === Number(id_product) )];

    if (!product) { 
        return <Error404 />;
    }

    useEffect(() => {
        document.title = `${title} - ${product.name}`;
    }, []);

    return (
        <div className="container">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }} >Tienda</Breadcrumb.Item>
                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="Product d-flex flex-column flex-md-row justify-content-between">
                <div className="product-card">
                    <div className="text-center">
                        <div className="product-favorite">❤ FAV</div>
                        <img src={product.image_url} />
                    </div>
                </div>

                <div className="mx-4">
                    <h4>{product.name}</h4>
                    <div>{product.description}</div>
                    

                    <div className="d-flex justify-content-between my-2">
                        <Badge bg="success" className="Category fs-6" data-id_category={product.id_category}>{getCategory(product.id_category, "name")}</Badge>
                        <Badge bg="primary" className="fs-6">{formatPrice(product.price)}</Badge>
                    </div>
                </div>

                <div className="product-cart d-flex flex-column align-items-center text-center py-2">
                    <b>Cantidad</b>
                    <div className="d-flex my-2 align-items-center">
                        <Button variant="danger" className="mt-1" onClick={() => removeFromCart(product)}>
                            <i className="bi bi-dash"></i>
                        </Button>

                        <span className="mx-4">{getQuantityFromCart(product)}</span>

                        <Button variant="success" className="mt-1" onClick={() => addToCart(product)}>
                            <i className="bi bi-plus"></i>
                        </Button>
                    </div>

                    <Button variant="primary" className="mt-1 w-100" onClick={() => confirmCart(product)}>
                        <i className="bi bi-cart4"></i> Ir al carrito
                    </Button>

                    <div className="mt-4">ICONS</div>
                </div>

            </div>
        </div>
    );
};

export default Product;