// components
import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";


const Home = () => {
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
      </main>
    </>
  );
};

export default Home;
