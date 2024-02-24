import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import axios from "axios";

import Product from "./Product";

const ProductSlider = () => {
    const [data, setData] = useState([]);
    const maxProductsOnSlide = 5;

    useEffect(() => {
        axios
            .get("products.json")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error al cargar datos; ", error));
    }, []);

    const sortByDateDesc = (products) => {
        return products
            .slice()
            .sort((a, b) => b.date_add.localeCompare(a.date_add));
    };

    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }}
            className="productSlider">
            {sortByDateDesc(data)
                .slice(0, maxProductsOnSlide)
                .map((product) => (
                    <SwiperSlide key={product.id_product}>
                        <section
                            className="product-card d-flex flex-column justify-content-between"
                            data-id_product={product.id_product}>
                            <div className="Products">
                                <div className="d-flex flex-wrap justify-content-center">
                                    <Product
                                        key={product.id_product}
                                        product={product}
                                    />
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default ProductSlider;
