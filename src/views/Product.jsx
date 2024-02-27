import { Link } from "react-router-dom";

// hooks
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Badge, Button } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// components
import Error404 from "./Error404";
import Favorites from "../components/Favorites";
import NavigationTrail from "../components/NavigationTrail";
import Reinsurances from "../components/Reinsurances";

const Product = () => {
    const {
        title,
        products,
        addToCart,
        removeFromCart,
        confirmCart,
        getQuantityFromCart,
        formatPrice,
        getCategory,
    } = useContext(DataContext);
    const { id_product } = useParams();

    const product =
        products[
            products.findIndex(
                (product) => Number(product.id_product) === Number(id_product)
            )
        ];

    if (!product) {
        return <Error404 />;
    }

    useEffect(() => {
        document.title = `${title} - ${product.name}`;
    }, []);

    return (
        <div className="container">
            <div className="my-4">
                <NavigationTrail
                    paths={[
                        {
                            text: "Tienda",
                            to: "/products",
                        },
                        {
                            text: product.name,
                            active: true,
                        },
                    ]}></NavigationTrail>
            </div>

            <div className="Product d-flex flex-column flex-md-row justify-content-between">
                <div className="product-card">
                    <div className="text-center">
                        <Favorites />
                        <img src={product.image_url} />
                    </div>
                </div>

                <div className="mx-4">
                    <h4>{product.name}</h4>
                    <div>{product.description}</div>

                    <div className="d-flex justify-content-between my-2">
                        <Badge
                            bg="success"
                            className="Category fs-6"
                            data-id_category={product.id_category}>
                            {getCategory(product.id_category, "name")}
                        </Badge>
                        <Badge bg="primary" className="fs-6">
                            {formatPrice(product.price)}
                        </Badge>
                    </div>
                </div>

                <div className="product-card d-flex flex-column align-items-center text-center py-2">
                    <b>Cantidad</b>
                    <div className="d-flex my-2 align-items-center">
                        <Button
                            variant="danger"
                            className="mt-1"
                            onClick={() => removeFromCart(product)}>
                            <i className="bi bi-dash"></i>
                        </Button>

                        <span className="mx-4">
                            {getQuantityFromCart(product)}
                        </span>

                        <Button
                            variant="success"
                            className="mt-1"
                            onClick={() => addToCart(product)}>
                            <i className="bi bi-plus"></i>
                        </Button>
                    </div>

                    <div className="my-4">
                        <Reinsurances className="reinsurances_product_detail"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
