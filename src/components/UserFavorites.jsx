import { Link } from "react-router-dom";

// hooks
import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Row, Col } from "react-bootstrap";

// components
import Product from "./Product";

// axios
import axios from "axios";

// utils
import Config from "../utils/Config";

const UserFavorites = () => {
    const { user, setIsLinkClicked} = useOutletContext();
    const { setUserObjective, favorites, setFavorites, products } =
        useContext(DataContext);
    const urlBaseServer = Config.get("URL_API");

    const getFavorites = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${urlBaseServer}favorites/${favorites.id_user}`,
                config
            );
            const favorites = response.data;
            setFavorites(favorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const favoriteProducts = products.filter((product) =>
        favorites.some((favorite) => favorite.id_product === product.id_product)
    );
    const favoritesBy = favorites.filter(
        (favorite) => favorite.id_user === user.id_user
    );

    useEffect(() => {
        getFavorites;
        if (favoritesBy.length > 0) {
            setUserObjective((prevState) => ({
                ...prevState,
                hasFavorites: true,
            }));
        }
    }, [favorites]);

    return (
        <>
            <section>
                <h1>Mis Favoritos</h1>
                <p>
                    {favoriteProducts.length === 0
                        ? "Agrega un producto a Favoritos y recibe una estrella."
                        : "¡Tus favoritos son increíbles! No dejes pasar la oportunidad y cómpralos."}
                </p>
            </section>
            <section>
                <Row className="row-cols-12 row-cols-lg-3">
                    {favoriteProducts.map((product) => (
                        <Col key={product.id_product}>
                            <Product
                                key={product.id_product}
                                product={product}
                            />
                        </Col>
                    ))}
                </Row>
            </section>
            <section className="d-flex justify-content-end mt-4">
                <Link
                    className="bg-transparent text-black border-0"
                    onClick={() => setIsLinkClicked(false)}>
                    <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
                </Link>
            </section>

        </>
    );
};

export default UserFavorites;
