// hooks
import { useContext, useEffect, useState } from "react";

// react-bootstrap
import { Row, Col } from "react-bootstrap";

// context
import { DataContext } from "../context/DataContext";

// components
import ProductsFilters from "../components/ProductsFilters";
import Product from "../components/Product";


const Products = () => {
  const { title, products } = useContext(DataContext);
  const [filter, setFilter] = useState({
    id_category: "",
    price: [0, 100000],
    order: "name_asc",
    text: "",
  });

  useEffect(() => {
    document.title = `${title} - Products`;
  }, []);

  const filterAndOrder = () => {
    //filter
    let filtered = products.filter((product) => {
      const matchByCategory = filter.id_category
        ? product.id_category === filter.id_category
        : true;

      const matchByPrice = filter.price
        ? Number(product.price) >= Number(filter.price[0]) &&
        Number(product.price) <= Number(filter.price[1])
        : true;

      const matchByText = () => {
        if (Number(filter.text)) {
          return Number(product.id_product) === Number(filter.text);
        }

        const includes = (text) =>
          text
            .toString()
            .toLowerCase()
            .includes(filter.text.trim().toLowerCase());

        return includes(product.name) || includes(product.description);
      };

      return matchByCategory && matchByPrice && matchByText();
    });

    //order
    switch (filter.order) {
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "price_asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price_desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "date_add_desc":
        filtered.sort((a, b) => b.date_add.localeCompare(a.date_add));
        break;
    }

    return filtered;
  };

  const productsFiltered = filterAndOrder();

  return (
    <>
      <section className="d-flex flex-column flex-lg-row justify-content-lg-end align-items-center">
        <nav className="p-4 pt-0 p-lg-2 d-flex flex-wrap justify-content-center justify-content-lg-end">
          <ProductsFilters filter={filter} setFilter={setFilter} />
        </nav>
      </section>
      <section>
        <Row className="row-cols-12 row-cols-md-3 row-cols-lg-4">
          {productsFiltered.map((product) => (
            <Col key={product.id_product}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </section></>
  );
};

export default Products;
