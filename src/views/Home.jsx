// components
import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";


const Home = () => {
    return (
        <>
            <header>
                <h1 className="title">Mi Market Latino</h1>
            </header>
            <main className="bg-body-secondary py-5">
                <Reinsurances />
                <section className="mt-5 pt-3">
                    <h2 className="text-center">Productos recién agregados</h2>
                    <ProductSlider />
                </section>
            </main>
        </>
    );
};

export default Home;
