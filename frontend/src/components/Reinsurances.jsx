import reinsurances_icon1 from "../img/reinsurance_icons/reinsurance_icons-01.svg";
import reinsurances_icon2 from "../img/reinsurance_icons/reinsurance_icons-02.svg";
import reinsurances_icon3 from "../img/reinsurance_icons/reinsurance_icons-03.svg";
import reinsurances_icon4 from "../img/reinsurance_icons/reinsurance_icons-04.svg";

const Reinsurances = () => {
    return (
        <section className="d-flex justify-content-evenly">
            <article className="d-flex flex-column align-items-center">
                <img
                    src={reinsurances_icon1}
                    className="reinsurance_icons"
                    alt="Ícono carro de compras"
                />
                <h6 className="reinsurance_texts mt-2">Compra Rápida</h6>
            </article>
            <article className="d-flex flex-column align-items-center">
                <img
                    src={reinsurances_icon2}
                    className="reinsurance_icons"
                    alt="Ícono avión de papel"
                />
                <h6 className="reinsurance_texts mt-2">Envío Seguro</h6>
            </article>
            <article className="d-flex flex-column align-items-center">
                <img
                    src={reinsurances_icon3}
                    className="reinsurance_icons"
                    alt="Ícono escudo"
                />
                <h6 className="reinsurance_texts mt-2">Sitio Protegido</h6>
            </article>
            <article className="d-flex flex-column align-items-center">
                <img
                    src={reinsurances_icon4}
                    className="reinsurance_icons"
                    alt="Ícono listón"
                />
                <h6 className="reinsurance_texts mt-2">Garantía</h6>
            </article>
        </section>
    );
};

export default Reinsurances;
