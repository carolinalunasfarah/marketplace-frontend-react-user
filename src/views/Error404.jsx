import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="d-flex align-items-center justify-content-center text-center ">
            <section className="my-4 d-flex flex-column align-items-center">
                <h4 className="cursor-default">¡Oops!</h4>
                <p className="cursor-default">La página solicitada no existe.</p>
                <img src="../assets/img/error404.jpg" />

                <Link to="/" className="btn btn-primary mt-2">Ir al Home</Link>
            </section>
        </div>
    );
};

export default Error404;
