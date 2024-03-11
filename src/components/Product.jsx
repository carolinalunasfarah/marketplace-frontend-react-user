import { Link } from "react-router-dom";

// hooks
import { useContext } from "react";

// react-bootstrap
import { Card, Badge, Button } from "react-bootstrap";

// context
import { DataContext } from "../context/DataContext";

// components
import Favorites from "./Favorites";

const Product = ({ product }) => {
    const { addToCart, formatPrice } = useContext(DataContext);
    const transformCategory = (category) => {
        if (category === "Musica") {
            return "Música";
        } else {
            return category;
        }
    };

    return (
        <Card
            data-id_product={product.id_product}
            className="rounded-4 box-shadow mb-4">
            <Card.Img
                variant="top"
                src={product.image_url}
                alt={product.name}
                height={250}
                className="object-fit-contain rounded-4"
            />
            <Card.Body className="text-center">
                <Card.Title>
                    <h3 className="text-uppercase fw-bold text-truncate fs-4 shadow-lg cursor-default">
                        {product.name}
                    </h3>
                </Card.Title>
                <Card.Text className="fs-3 cursor-default">
                    {formatPrice(product.price)}
                </Card.Text>
                <Link
                    className="btn btn-secondary w-100 mb-2"
                    to={`/producto/${product.id_product}`}>
                    Ver detalles
                </Link>
                <Button
                    className="btn-primary border-0 w-100 mb-2 shadow-lg"
                    onClick={() => addToCart(product)}>
                    <i className="bi bi-cart4"></i> Agregar al Carro
                </Button>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
                <Badge
                    className="Category fs-6 cursor-default"
                    data-id_category={product.category}>
                    <span className="CategoryIcon"></span>
                    {transformCategory(product.category)}
                </Badge>
                <Favorites productId={product.id_product} />
            </Card.Footer>
        </Card>
    );
};

export default Product;
