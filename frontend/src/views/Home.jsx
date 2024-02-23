import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";

const Home = () => {
    return (
        <>
            <header className="mb-5">
                <h1 className="title">Mi Market Latino</h1>
            </header>
            <main>
                <Reinsurances />
                <section className="mt-5 pt-3">
                    <h4>Productos recién agregados</h4>
                    <ProductSlider />
                </section>
            </main>
        </>
    );
};

export default Home;
