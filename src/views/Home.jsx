// hooks
import React, { useContext, useEffect } from "react";

// components
import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";
import Categories from "../components/Categories";

// context
import { DataContext } from "../context/DataContext";

const Home = () => {
    const { title } = useContext(DataContext);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Home`;
    }, []);

    return (
        <>
            <header>
                <section className="hero-section">
                    <h1 className="title text-white">Mi Market Latino</h1>
                </section>
            </header>
            <main className="bg-body-secondary py-4">
                <Reinsurances />
                <section className="mt-5 pt-3">
                    <h2 className="text-center">Productos recién agregados</h2>
                    <ProductSlider />
                </section>
                <section className="mb-5">
                    <h2 className="text-center mb-5">Nuestras categorías</h2>
                    <Categories />
                </section>
            </main>
        </>
    );
};

export default Home;
