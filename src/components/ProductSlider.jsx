import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataContext } from '../context/DataContext'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useContext } from "react";

import Product from "./Product";

const ProductSlider = () => {
  const { products } = useContext(DataContext)
  const maxProductsOnSlide = 5;

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
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      className="productSlider">
      {sortByDateDesc(products) // Usar directamente `products` obtenidos del contexto
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
