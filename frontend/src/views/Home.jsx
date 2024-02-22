import Reinsurances from "../components/Reinsurances";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <header className="mb-5">
                <h1 className="title">Mi Market Latino</h1>
            </header>
            <main>
                <Reinsurances />
            </main>
            <Footer />
        </>
    );
};

export default Home;
